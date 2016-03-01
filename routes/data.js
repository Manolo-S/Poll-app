var express = require('express');
var router = express.Router();
var pollData;
var mongoose = require('mongoose');
var pollModel = require('../config/pollModel.js');


console.log('data.js called');

router.use('/polldata', function(req, res, next) { //TODO data functies in
    if (mongoose.connection.readyState = 0) { //apart bestand als het lukt
        var db = mongoose.connect('mongodb://localhost/voteapp');
    }
    console.log('data.js router.use called');
    pollModel.find({}, function(err, polls) {
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


router.get('/polldata', function(req, res) {
    res.json(pollData);    
});

module.exports = router;