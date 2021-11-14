const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require("./database.js")
var urlencodedParser = bodyParser.urlencoded({extended: false})
const PORT = process.env.PORT || 3000
var pjXML = require('pjxml');
var parseString = require('xml2js').parseString;

const public = [
  {
    "_id": "61902fe6490847406468e661",
    "index": 0,
    "guid": "2aef2514-6850-4f55-ac89-3f3d58da4066",
    "isActive": false,
    "balance": "$3,346.91",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Gill Booker",
    "gender": "male",
    "company": "COMVOY",
    "email": "gillbooker@comvoy.com",
    "phone": "+1 (964) 468-2932",
    "address": "541 Kingston Avenue, Fresno, Kansas, 564",
    "about": "Labore ex cupidatat consequat eiusmod in ex proident. Excepteur in cupidatat enim ut qui mollit. Cillum sit aliqua quis aute commodo in anim aliquip sit deserunt. Cillum pariatur pariatur Lorem ex cillum ex amet qui nostrud amet do fugiat cillum. Officia non est elit fugiat Lorem quis duis proident duis excepteur sunt cillum. Ullamco occaecat proident aute sint labore anim eu quis consectetur in est nisi ad.\r\n",
    "registered": "2014-01-22T03:17:02 -01:00",
    "latitude": -62.574969,
    "longitude": -53.114542,
    "tags": [
      "dolore",
      "in",
      "dolore",
      "esse",
      "pariatur",
      "id",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Helga Dominguez"
      },
      {
        "id": 1,
        "name": "Jenna Kane"
      },
      {
        "id": 2,
        "name": "Burks Knowles"
      }
    ],
    "greeting": "Hello, Gill Booker! You have 7 unread messages.",
    "favoriteFruit": "banana"
  }
]

const private = [{
  "title": "Jako bitan JSON, ovo samo admin smije vidit",
  "user": "admin",
  "password": "pa$$w0rd"
}]

var testiranje = true;
 
express()

  .use(express.urlencoded({extended: false}))
  .use(express.json())

  .set("view engine", "ejs")
  .get('/', function(req, res){
    res.render("home", {
      sigurnost: testiranje
    });
  })
  .get('/bac', function(req, res){
    res.render("bac", {
      sigurnost: testiranje
    });
  })
  .get('/private', function(req, res){
    res.send(private);
  })
  .post('/public', function(req, res){
    res.send(public);
  })
  .get("/sql", (req, res, next) => {
    res.render("movies", {
      movies: {},
      valid: false,
      sigurnost: testiranje
    })
  })
  .post('/sql', urlencodedParser, function(req, res){
    var name = req.body['movie_name']
    var security = req.body['security']

    // if(security == 'sigurno'){
    //  name = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
    //}
    if(testiranje){
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
    }
    console.log(name)
    var sql = "select * from movies where lower(name) like '%" + name.toLowerCase() + "%'"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          console.log(err.message)
          res.render("movies", {
            movies: rows,
            valid: false,
            sigurnost: testiranje
          });
          return
        }
        res.render("movies", {
          movies: rows,
          valid: true,
          sigurnost: testiranje
        });
      });
  })
  .get('/xml', function(req, res){
    res.render("xml", {
      document: "",
      sigurnost: testiranje
    });
  })
  .post('/xml', urlencodedParser, function(req, res){
    var xml = req.body['xml']
    var security = req.body['security']
    
    if(testiranje){
      parseString(xml, function (err, result) {
        var data = JSON.stringify(result);
        res.render("xml", {
          document: data,
          sigurnost: testiranje
        })
    });
    }
    else{
      var doc = pjXML.parse(xml)
      var data = JSON.stringify(doc);
      // console.log(doc)
      // console.log(data)
      res.render("xml", {
        document: data,
        sigurnost: testiranje
      });
    }
    
  })
  .get('/test', function(req, res){
    var xml = '<document attribute="value"><name>David Bowie</name></document>';
    var xxe = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT foo ANY><!ENTITY bar "World "><!ENTITY t1 "&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;"><!ENTITY t2 "&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;"><!ENTITY t3 "&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;">]><foo>Hello &t3;&t3;&t3;&t3;&t3;&t3;</foo>';
    var xxe2 = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE bar [<!ELEMENT foo ANY ><!ENTITY xxe SYSTEM "file:///c:/boot.ini">]><bar>&xxe;</bar>'
    var doc = pjXML.parse(xml)
    var doc2 = pjXML.parse(xxe)
    res.send(doc2) // ["content"][3]["content"][0]
  })
  .post('/change-security', function(req, res){
    testiranje = !testiranje;
    res.send(testiranje);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
