var http = require('http');
var request = require("request");
var jsonBody = {};
var results
request("http://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=MU&qopts.columns=date,open&api_key=rXTz5_EBxzttkzjesFwE", function(error, response, body) {

   jsonBody = JSON.parse(body).datatable.data.forEach(function (entry) {
        results.push({date: entry[0], price: entry[1]});
    })
});

http.createServer(function(request, res){

// Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(JSON.stringify(results.slice(results.length-2251, results.length-1251)));

}).listen(4000);