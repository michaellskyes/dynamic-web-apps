var express = require('express');
var Mongoose = require('mongoose');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var dropbox = require('dropbox');
var fs = require('fs');

var app = express();
var path = require('path');

require('dotenv').config();

//Mongoose.connect(process.env.DB_URL);

var node_dropbox = require('node-dropbox');
api = node_dropbox.api('knHVpSSQbDQAAAAAAAAPrxdmY3Q-W5z_zozgUEnwejvTthxt6rvnbddQeOBeTreg');
api.account(function(err, res, body) {
	console.log(body);
});      
api.getFile('shiba.jpg', function(data){
    console.log(data);
})

var dbx = new dropbox({ accessToken: 'knHVpSSQbDQAAAAAAAAPrxdmY3Q-W5z_zozgUEnwejvTthxt6rvnbddQeOBeTreg' });

var result = dbx.sharingGetSharedLinkFile('shiba.jpg').then(function(data){
    console.log(data);
    return data.fileBlob;
}) 
console.log(result);

var portNum = 7777;

//function blah(err, res, body) {
//    console.log(err, res, body)
//}

app.set('port', portNum);

app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var api = require('./routes/feed');
app.use('/feed', api);

 app.use('/public', express.static(path.join(__dirname + '/public')) );
// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});

