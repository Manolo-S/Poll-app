var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pollModel = require('../config/pollModel.js');

function createpollItems(categorie) {
	return {
		categorie: categorie,
		votes: 0
	};
}

function storePoll(poll) {
	console.log('storePoll function called')
	console.log('poll in storepoll', poll)
	if (mongoose.connection.readyState = 0) { 
		// var db = mongoose.connect('mongodb://localhost/voteapp');
		var db = mongoose.connect('mongodb://piet:snot@ds019678.mlab.com:19678/poll-app');

	}
	pollModel.create({
		pollName: poll.pollTitle,
		pollItems: poll.categories.map(createpollItems)
	}, function(err, polls) {
		if (!err) {
			var pollData = {
				"pollData": polls
			};
		} else {
		}
		mongoose.connection.close(function() {
			console.log(
				'Mongoose connection disconnected');
		});
	});
}


router.use('/', function(req, res, next) {

	if (!req.user) {
		res.redirect('/');
	}
	next();
})

router.get('/', function(req, res) {
	res.render('create-poll-new')
});

router.post('/', function(req, res) {
	var poll = req.body;
	storePoll(poll);
});

module.exports = router;