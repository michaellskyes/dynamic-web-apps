var express = require('express');
var app = express();

app.use(function(req, res, next){
    console.log("request to " + req.url);
    next();
});

app.get('/', function(req, res){
    res.send('<h1>hello word</h1>');
});

app.get('/profile/:name', function(req, res) {
   res.send('<h1>Your name is ' + req.params.name + '</h1>'); 
});

// all requests that make it here use app.use

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
   res.send("404 - Not Found"); 
});


app.listen(3000);

console.log("listening on port 3000");