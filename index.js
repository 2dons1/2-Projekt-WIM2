const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3000
const db = require("./database.js")

var urlencodedParser = bodyParser.urlencoded({extended: false})

express()

  .use(express.urlencoded({extended: false}))
  .use(express.json())
  .set("view engine", "ejs")
  .get('/', function(req, res){
    res.send("Hello World 123456");
  })
  .get('/', function(req, res){
    res.send("2 Projekt iz WIM2");
  })
  .get('/1', function(req, res){
    res.send("SQL umetanje (SQL Injection)");
  })
  .get('/2', function(req, res){
    res.send(" Loša kontrola pristupa (Broken Access Control)");
  })
  .get('/3', function(req, res){
    res.send("Vanjski XML entiteti (XML External Entity, XXE)");
  })
  .get("/movies", (req, res, next) => {
    res.render("movies", {
      movies: {},
      valid: false
    })
  })
  .post('/movies', urlencodedParser, function(req, res){
    var name = req.body['movie_name']
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
