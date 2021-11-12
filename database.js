var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            genre text, 
            director text, 
            year text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("Database already exists!")
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO movies (name, genre, director, year) VALUES (?,?,?,?)'
                db.run(insert, ["The Lord of the Rings: The Fellowship of the Ring","Fantasy / Adventure", "Peter Jackson", "2001"])
                db.run(insert, ["The Lord of the Rings: The Two Towers","Fantasy / Adventure", "Peter Jackson", "2002"])
                db.run(insert, ["The Lord of the Rings: The Return of the King","Fantasy / Adventure", "Peter Jackson", "2003"])
                db.run(insert, ["The Hobbit: An Unexpected Journey","Fantasy / Adventure", "Peter Jackson", "2012"])
                db.run(insert, ["The Hobbit: The Desolation of Smaug","Fantasy / Adventure", "Peter Jackson", "2013"])
                db.run(insert, ["The Hobbit: The Battle of the Five Armies","Fantasy / Adventure", "Peter Jackson", "2014"])
            }
        });  
    }
});


module.exports = db