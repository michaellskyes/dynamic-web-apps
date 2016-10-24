var express = require('express');
var Mongoose = require('mongoose');
var hbs = require('express-handlebars');

var app = express();
 var path = require('path');

//require('dotenv').config();
//
//Mongoose.connect(process.env.DB_URL);

var portNum = 7777;
app.set('port', portNum);

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

var api = require('./routes/feed');
app.use('/feed', api);

 app.use(express.static(path.join(__dirname + '/public')) );

// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});