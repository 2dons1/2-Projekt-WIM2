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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
