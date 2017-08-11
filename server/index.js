var http = require('http');
var request = require("request");
var jsonBody = [];
var results = [];
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/stocks";





request("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=1min&outputsize=full&apikey=9BV464T7QBUFGB06", function(error, response, body) {

   jsonBody =( JSON.parse(body));
  /* jsonBody.forEach(function (entry) { console.log(entry);
        results.push({date: entry[0], open: entry[1], high: entry[2], low: entry[3], close: entry[4]});
    })*/

    for(var i in jsonBody["Time Series (1min)"]){

        results.push({date: i,

        open: jsonBody["Time Series (1min)"][i]["1. open"],
        high: jsonBody["Time Series (1min)"][i]["2. high"],
        low: jsonBody["Time Series (1min)"][i]["3. low"],
            close: jsonBody["Time Series (1min)"][i]["4. close"],
            volume: jsonBody["Time Series (1min)"][i]["5. volume"]



        })


       }
/*    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("prices").find({date:'2017-07-24 14:21:00'}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });*/


    console.log(results[0]);
});

http.createServer(function(request, res){

// Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(JSON.stringify(results));

}).listen(4000);