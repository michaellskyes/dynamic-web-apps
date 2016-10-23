var express = require('express');
var hbs = require('express-handlebars');

var app = express();


var portNum = process.env.port || 8888;
app.set('port', portNum);

//tell express to use handlebars
app.engine ('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars')

app.get('/:name', function(req, res) {
	res.render('home', {name: req.params.name
	});
});
//start server
app.listen(portNum, function() {
	console.log('listen on port ', portNum);
});

