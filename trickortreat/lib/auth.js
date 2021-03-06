var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user');

module.exports = function(app, options){
    
    return {
        init: function(){
            passport.use(new LocalStrategy(User.authenticate()));
            passport.serializeUser(function(user, done){
                done(null, user._id);
            });
            
            passport.deserializeUser(function(id, done){
                User.findById(id, function(err, user){
                if(err || !user) {
                    return done(err, null);
                }
                    done(null, user);
                });
            });
            
            
            app.use(passport.initialize());
            app.use(passport.session());
            
            app.use(function(req, res, next){
                res.locals.user = req.user;
                next();
            })
        },
        registerRoutes: function(){
            
            app.get('/signup', function(req, res){
                res.render('signup', {header: 'Sign Up'});
            });
                    
            app.post('/signup', function(req, res, next) {
                var newUser = new User({
                    username: req.body.username,
                    treats: req.body.treats
                });
                
                User.register(newUser, req.body.password, function(err, user){
                    if(err){
                        console.log('signup error', err);
                        
                        return res.render({
                            flash: {
                                type: 'negative',
                                header: 'Signup error',
                                body: err.message
                            },
                            header: 'Sign up'
                            });
                    }
                           passport.authenticate('local')(req, res, function(){
                               req.session.flash = {
                                   type: 'positive',
                                   header: 'Registration Success',
                                   body: 'You signed up as ' + user.username
                               }
                               res.redirect('/');
                                 });
                           });             
                        });
            app.get('/login', function(req, res){
                res.render('signup', {header: 'Log In'});
            });
            
            app.post('/login', passport.authenticate('local'), function(req, res) {
                req.session.flash = {
                    type: 'positive',
                    header: 'Signed in',
                    body: 'You have logged in'
                };
                res.redirect('/')
            });
            
            app.get('/logout', function(req, res) {
                req.logout();
                req.session.flash = {
                    type: 'positive',
                    header: 'Signed out',
                    body: 'You have signed out'
                };
                res.redirect('/');
            });
        },
        
        addTreats: function(){
            app.use(function(req, res, next){
               if(req.user) req.user.treats = treats; 
            });
        }
    }
};




