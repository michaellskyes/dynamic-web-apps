var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');


require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 9001;


app.use(session({
    secret: process.env.cookieSecret,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.DB_URL
    })
  }
));

app.use(function(req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect(process.env.DB_URL);

var options = {};
var auth = require('./lib/auth')(app, options);
auth.init();
auth.registerRoutes();



app.get('/', function(req, res) {
  if (req.session.treat) {
   return res.render('view', {
     msg: 'You have candy: ' + treats
   }); 
  }
  return res.render('view', {
    msg: 'No treats.'
  });
});


app.get('/snickers', function(req, res) {
  req.session.treat = ' snickers';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'your treat is ' + req.session.treat
  };
  res.redirect('/');
});


app.get('/twix', function(req, res) {
  req.session.treat = ' twix';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'your treat is ' + req.session.treat
  };
  res.redirect('/');
});

app.get('/mm', function(req, res) {
  req.session.treat = ' mm';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'your treat is ' + req.session.treat
  };
  res.redirect('/');
});

app.get('/kisses', function(req, res) {
  req.session.treat = ' kisses';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'your treat is ' + req.session.treat
  };
  res.redirect('/');
});

app.get('/clear', function(req, res) {
  delete req.session.treat;
  treats = [];
  req.session.flash = {
    type: 'negative',
    header: 'No treat',
    body: 'Your bag is empty',
  };
  res.redirect('/');
});

app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});