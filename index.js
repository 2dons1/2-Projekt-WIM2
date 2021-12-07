const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require("./database.js")
var urlencodedParser = bodyParser.urlencoded({extended: false})
const PORT = process.env.PORT || 3000
var pjXML = require('pjxml');
var parseString = require('xml2js').parseString;

const user_list = [
  "freestar", 
  "boyscoutscattle", 
  "lovesickmany", 
  "childwarm", 
  "insistenthoney", 
  "girlfriendobliging", 
  "cardmultiple", 
  "testswamp", 
  "orchidboyfriend", 
  "cootportfolio"
];
const user_email_list = [
  "freestar - rockxy@telemol.club",
  "boyscoutscattle - havenlaw@foohurfe.com ",
  "lovesickmany - holski@chillphet.com",
  "childwarm - bigdaddybean007@masjoco.com",
  "insistenthoney - b3b3b3@nugastore.com",
  "girlfriendobliging - narcisochka@yalexonyegues.com",
  "cardmultiple - adriian17@pubb.site",
  "testswamp - alessandrabernascon@rlooa.com",
  "orchidboyfriend - fasg12g@axie.ml",
  "cootportfolio - frozenium@songshnagu.com",
]

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
  .get('/admin/listUsers', function(req, res){
    res.render('private', {
      data: user_email_list
    });
  })
  .post('/user/listUsers', function(req, res){
    res.render("public", {
      data: user_list
    });
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
    var sigurnost = req.body["sigurnost"]

    if(sigurnost == "safe"){
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
    }
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
    var sigurnost = req.body["sigurnost"]
    
    if(sigurnost == "safe"){
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

      var data = JSON.stringify(doc.xml());
      var data1 = JSON.stringify(doc);
      var data2 = JSON.stringify(doc.text());
      res.render("xml", {
        document: data,
        sigurnost: testiranje
      });
    }
    
  })
  .post('/change-security', function(req, res){
    testiranje = !testiranje;
    res.send(testiranje);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
