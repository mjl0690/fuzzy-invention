var http = require('http');

var request2 = require("request");
var test = [];
request2("http://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=MU&qopts.columns=date,open&api_key=rXTz5_EBxzttkzjesFwE", function(error, response, body) {
console.log(body.datatable);
    JSON.parse(body).datatable.data.forEach(function (entry) {
        test.push({date: entry[0], price: entry[1]});

    })
 console.log(test);


});
var options= {
    host: 'http://www.quandl.com',
    path:'/api/v3/datatables/WIKI/PRICES.json?ticker=SPY&qopts.columns=date,open&api_key=rXTz5_EBxzttkzjesFwE'
}

var req = http.get(options,function(res,body){

    res.send(body);})
req.on('error', function(err) {
    // Handle error
});
http.createServer(function(request, res){

// Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
res.writeHead(200,{'Content-Type': 'text/plain'});

console.log(test.length);
   res.end(JSON.stringify(test.slice(test.length-2251,test.length-1251)));



console.log('hi');
}).listen(4000);