var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var mongoose = require('mongoose');
var config = require('./config/database.config');

var indexRouter = require('./routes/index');
var cors = require('cors');

var notesRouter = require('./routes/notes');
var todolistsRouter = require('./routes/todolists');

var hostname = "localhost";
var port = 3001;



mongoose.connect(config.url, { useNewUrlParser: true });
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


app.use('/notes',notesRouter);
app.use('/todolists',todolistsRouter);
// app.listen(port, () => { console.log(" on est sur le port " + port)})
module.exports = app;

