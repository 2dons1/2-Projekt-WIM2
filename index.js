const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const db = require("./database.js")
var urlencodedParser = bodyParser.urlencoded({extended: false})
const PORT = process.env.PORT || 3000

var pjXML = require('pjxml');
var parseString = require('xml2js').parseString;
var exec = require("child_process").exec;


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

const simulate_xxe = `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin`

const simulate_text = 'xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-1&quot;\r\n\r\nY';

const username = "admin";
const password = "admin"; // Mozda dodat neku jednostavnu enkripciju?
const skripta = "<script>javascript:alert('XXE Injection!');</script>";

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

      if (data1.length == 161){
        data2 = simulate_xxe
      }
      data2 = data2.replace(/(?:\\[rn])+/g, "");
      data2 = data2.replace('script&gt;', '<script>');
      data2 = data2.replace('/script&gt;', '</script>');
      data2 = data2.replace('&apos;', '"');
      data2 = data2.replace('&apos;', '"');
      // console.log(data2);
      res.render("xml", {
        document: data2,
        sigurnost: testiranje
      });
    }
    
  })
  .post('/change-security', function(req, res){
    testiranje = !testiranje;
    res.send(testiranje);
  })
  .post('/auth', function(req, res){
    var user = req.body['user_name']
    var pwd = req.body["pass"]

    if(user == username && pwd == password ){
      res.render("auth", {
        data: user_email_list
      })
    }
    else{
      res.render("not_auth");
    }
  })
  .get('/js', function(req, res){
    res.render("test", {
      data: skripta,
      data2: 'Dorian Doncevic'
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
