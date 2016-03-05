'user strict';
var express = require('express');
var router = express.Router();
var pollData;
var mongoose = require('mongoose');
var pollModel = require('../config/pollModel.js');


console.log('userdata.js called');

router.use('/', function(req, res, next) { //TODO data functies in
    var user = req.query.userName;
    if (mongoose.connection.readyState = 0) { //apart bestand als het lukt
        // var db = mongoose.connect('mongodb://localhost/voteapp');
        var db = mongoose.connect('mongodb://piet:snot@ds019678.mlab.com:19678/poll-app');

    }
    console.log('userdata.js router.use called');

    pollModel.find({userName: user}, function(err, polls) {
        if (err){console.log(err)};
        console.log('retrieved data');
        pollData = {
            "pollData": polls
        };
        console.log(pollData);
        mongoose.connection.close(function() {
            console.log(
                'Mongoose connection disconnected');
        });
        next();
    });
});

router.get('/', function(req, res) {
     res.json(pollData);    
    console.log('/userdata called');
});

module.exports = router;