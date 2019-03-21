var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

const cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('express-session')({ secret: 'WmpNpJTcfbhabk5jQ4XboJSkwFkmsKULondCxAxv', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


//app.use('/auth_twitter', auth_twitter);

//app.use('/auth_twitter', twitter);
// app.use('/auth/twitter/reverse', twitter_reverse);
//app.use('/twitter', twitter);
//app.use('/auth_twitter', twitter_reverse);



module.exports = app;
