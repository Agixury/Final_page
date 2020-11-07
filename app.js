#!/usr/bin/env nodejs
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const users = require('./routes/users');
const renders = require('./routes/renders');
const mysql=require('mysql2')
const db=require('./config/db.config')
const passport = require('passport')

const session = require('express-session')

require('./middleware/fb_passport_auth');
require('./middleware/google_passport_auth');

app.use(compression());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use(renders);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); 



// route middleware to make sure
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);


app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running at port: ', process.env.PORT || 3000);
});
