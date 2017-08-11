var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/stocks";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection("prices", function(err, res) {
        if (err) throw err;
        console.log("Table created!");
        db.close();
    });
});