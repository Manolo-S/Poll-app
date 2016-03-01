'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pollModel = require('../config/pollModel.js');

function updatePoll(updatedPoll) {
    var pollItems = {
        pollItems: updatedPoll.pollItems
    };
    var id = updatedPoll._id;
    if (mongoose.connection.readyState = 0) { //apart bestand als het lukt
		// var db = mongoose.connect('mongodb://localhost/voteapp');
   var db = mongoose.connect('mongodb://piet:snot@ds019678.mlab.com:19678/poll-app');

	}
    pollModel.findByIdAndUpdate(id, pollItems, function(error, polls) {
        if (error) {
            console.log(error)
        };
    });
    mongoose.connection.close(function() {
			console.log(
				'Mongoose connection disconnected');
		});
}

router.post('/', function(req, res) {
     var updatedPoll = req.body.updatedPoll;
    console.log('poll received by server', req.body.updatedPoll);
    updatePoll(updatedPoll);
});

module.exports = router;