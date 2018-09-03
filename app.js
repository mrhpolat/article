
var http = require('http');
var fs = require('fs');

var path = require('path');
var express = require('express');
var app = express();
var session = require('express-session');

var bodyParser = require('body-parser');
var ejsLayout = require('express-ejs-layouts');

var db = require('./server/models/db');

app.set('view engine','ejs');
app.set('views',path.join(__dirname, './server/views'));

app.set('trust-proxy',1);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(ejsLayout);
app.use('/public', express.static(path.join(__dirname,'public')));


app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));


require('./server/routes/RoutesManager')(app);

app.listen(8080);