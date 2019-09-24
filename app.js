var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var locals = require('ejs-locals');
var sessions=require('express-session');
const mysql = require('mysql');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerinputRouter = require('./routes/customerinput');
var adminloginRouter=require('./routes/adminlogin');
var employeeloginRouter=require('./routes/employeelogin');
var forgotpasswordRouter=require('./routes/forgotpassword');
var resetpasswordRouter=require('./routes/resetpassword');


var complaintRouter=require('./routes/complaint');
var complaintslistRouter=require('./routes/complaintslist');
var selectcomplaintRouter=require('./routes/selectcomplaint');



const port = 8030;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
    const db = mysql.createConnection ({
        host: 'localhost',
        user: 'root',
        password: 'root123',
        database: 'customerinput',
        multipleStatements: true,
        port:3309
    });
    // connect to database
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    });
    global.db = db;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
    secret:'itsasecret',
    resave:false,
    saveUninitialized:true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.adminrole = req.session.adminrole;
  next();
});


app.engine('html', require('ejs').renderFile); //configure html and ejs
app.set('view engine', 'html');



app.use('/', indexRouter);
app.use('/signup', indexRouter);
app.use('/customerinput', customerinputRouter);
app.use('/adminlogin', adminloginRouter);
app.use('/employeelogin', employeeloginRouter);
app.use('/users', usersRouter);
app.use('/complaint',complaintRouter);
app.use('/complaintslist',complaintslistRouter);
app.use('/selectcomplaint',selectcomplaintRouter);
app.use('/sendcomplaint',complaintslistRouter);
app.use('/forgotpassword',forgotpasswordRouter);
app.use('/resetpassword',resetpasswordRouter);

module.exports = app;