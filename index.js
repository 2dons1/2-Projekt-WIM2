const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const db = require("./database.js")

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
    var sql = "select * from movies order by id asc"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render("movies", {
          movies: rows
        });
      });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
