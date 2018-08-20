var http = require('http');
var request = require("request");
var jsonBody = [];
var results2 = [];
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/stocks";

function getData(ticker){
//"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPX&interval=1day&outputsize=full&apikey=9BV464T7QBUFGB06"
request("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&symbol="+ticker+"&outputsize=full&apikey=9BV464T7QBUFGB06", function(error, results, body) {
   jsonBody =( JSON.parse(body));
 ;
    for(var i in jsonBody["Time Series (1min)"]){
        results2.push({date: i,
        open: jsonBody["Time Series (1min)"][i]["1. open"],
        high: jsonBody["Time Series (1min)"][i]["2. high"],
        low: jsonBody["Time Series (1min)"][i]["3. low"],
        close: jsonBody["Time Series (1min)"][i]["4. close"],
         volume: jsonBody["Time Series (1min)"][i]["5. volume"]
        })
    }

resistance(results2);
    for(var j=0; j< Math.ceil(results2.length/391); j++){
     //   start(391*j,391*(j+1), ticker, results2);
       
        }
        

});
}

getData('AAPL');
/*getData('MSFT');

getData('AMZN');
getData('FB');
getData('JPM');
getData('JNJ');
getData('XOM');
getData('GOOG');
getData('GOOGL');
getData('BAC');
getData('INTC');
getData('AMD');*/

var closeLow;
var closeDateLow;
var closeHigh;
var closeDateHigh;

function resistance(results){
var resistance = {};
results.forEach((results)=>{ 
    if(results && !resistance[results.low])
    resistance[results.low]=0;

    
    if(results && !resistance[results.high])
    resistance[results.high]=0;

    if (resistance[results.low]>=0)
    resistance[results.low]++;
    if (resistance[results.high]>=0)
    resistance[results.high]++;
})
var sortedResistance = [];
for (var key in resistance){
    sortedResistance.push({
        name:key,
        value:resistance[key]
    })

}

var byName = sortedResistance.slice().sort(function(a,b){
    return (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0)
})

var byValue = sortedResistance.slice().sort(function(a,b){
    return (b.value > a.value) ? 1 : ((a.value > b.value) ? -1 : 0)
})

console.log(byValue);

}

function start(start, end, ticker, results){
    var resistance={};
    for(var i=start; i<end; i++){
if(!results[i])
return;
        


        if(!closeLow && results[i] ){ 
       closeLow = results[i].low;
       closeDateLow = results[i].date;
       closeHigh = results[i].high;
       closeDateHigh = results[i].date;
        }

       if( results[i] && closeLow > results[i].low){
       closeLow = results[i].low;
       closeDateLow = results[i].date;;
       }

       if ( results[i] && closeHigh < results[i].high){
           closeHigh=results[i].high;
           closeDateHigh=results[i].date;
       }
    }
console.log( ticker, 'High:', closeDateHigh, closeHigh, 'Low:', closeDateLow, closeLow);

var fs = require('fs');
var file = fs.createWriteStream(ticker+'_'+start+'.txt');
file.on('error', function(err) { /* error handling */ });
file.write(ticker+' High: '+ closeDateHigh+' ' + closeHigh+ ' Low: ' + closeDateLow+ ' ' + closeLow + '\n');
file.end();
closeDateLow = closeLow = closeHigh = closeDateHigh= undefined;
}

http.createServer(function(request, res){

// Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
res.writeHead(200,{'Content-Type': 'text/plain'});
    res.end(JSON.stringify(results));

}).listen(4000);