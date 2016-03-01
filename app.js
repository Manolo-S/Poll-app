var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session'); //TODO bekijk
var mongoose = require('mongoose');

var index = require('./routes/index');
var createPoll = require('./routes/create-poll');
var auth = require('./routes/auth');
var data = require('./routes/data');
var storeVote = require('./routes/store-vote');

var app = express();
var db = mongoose.connect('mongodb://localhost/voteapp');
var pollModel = require('./config/pollModel.js')

function pollItemsFun(pollItem) {
    return pollItem;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'})); //TODO bekijk Express-session package

require('./config/passport')(app); //TODO bekijk
app.use('/', index);
app.use('/create-poll', createPoll);
app.use('/auth', auth);
app.use('/store-vote', storeVote);

app.use('/data', data);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;


