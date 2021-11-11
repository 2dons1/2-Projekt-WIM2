const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

express()

  .use(express.urlencoded({extended: false}))
  .use(express.json())
  .set("view engine", "ejs")
  .get('/', function(req, res){
    res.send("Hello World 12345");
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
