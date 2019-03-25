var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var mongoose = require('mongoose');
var config = require('./config/database.config');

var indexRouter = require('./routes/index');


var notesRouter = require('./routes/notes');
var todolistsRouter = require('./routes/todolists');

var hostname = "localhost";
var port = 3001;

var allowCrossDomain = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
 }


mongoose.connect(config.url, { useNewUrlParser: true });
var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain); // plumbing it in as middleware
app.use('/', indexRouter);


app.use('/notes',notesRouter);
app.use('/todolists',todolistsRouter);
app.listen(port,hostname, () => { console.log(" on est sur le port " + port)})
module.exports = app;

