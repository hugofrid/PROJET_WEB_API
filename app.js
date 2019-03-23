var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var config = require('./config/database.config');

var indexRouter = require('./routes/index');


var notesRouter = require('./routes/notes');
var todolistsRouter = require('./routes/todolists');



mongoose.connect(config.url, { useNewUrlParser: true });
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use('/notes',notesRouter);
app.use('/todolists',todolistsRouter);

module.exports = app;
