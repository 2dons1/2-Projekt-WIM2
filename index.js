const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require("./database.js")
var urlencodedParser = bodyParser.urlencoded({extended: false})
const PORT = process.env.PORT || 3000
var pjXML = require('pjxml');
 
express()

  .use(express.urlencoded({extended: false}))
  .use(express.json())

  .set("view engine", "ejs")
  .get('/', function(req, res){
    res.send("2 Projekt iz WIM2");
  })
  .get("/movies", (req, res, next) => {
    res.render("movies", {
      movies: {},
      valid: false
    })
  })
  .post('/movies', urlencodedParser, function(req, res){
    var name = req.body['movie_name']
    var security = req.body['security']

    if(security == 'sigurno'){
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
            valid: false
          });
          return
        }
        res.render("movies", {
          movies: rows,
          valid: true
        });
      });
  })
  .get('/test', function(req, res){
    var xml = '<document attribute="value"><name>David Bowie</name></document>';
    var xxe = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [<!ELEMENT foo ANY><!ENTITY bar "World "><!ENTITY t1 "&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;&bar;"><!ENTITY t2 "&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;&t1;"><!ENTITY t3 "&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;&t2;">]><foo>Hello &t3;&t3;&t3;&t3;&t3;&t3;</foo>';
    var xxe2 = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE bar [<!ELEMENT foo ANY ><!ENTITY xxe SYSTEM "file:///c:/boot.ini">]><bar>&xxe;</bar>'
    var doc = pjXML.parse(xml)
    var doc2 = pjXML.parse(xxe)
    res.send(doc2) // ["content"][3]["content"][0]
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
