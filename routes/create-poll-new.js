var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var pollModel = require('../config/pollModel.js');
var pollData;

function createpollItems(categorie) {
	return {
		categorie: categorie,
		votes: 0
	};
}

function storePoll (poll){
	if (mongoose.connection.readyState = 0) { 
		var db = mongoose.connect('mongodb://piet:snot@ds019678.mlab.com:19678/poll-app');
	}

	pollModel.create({
		pollNumber: poll.pollNumber,
		userName: poll.userName,
		pollName: poll.pollName,
		pollItems: poll.categories.map(createpollItems)
	}, function(err, polls) {
		if (!err) {
			var pollData = {
				"pollData": polls
			};
		mongoose.connection.close(function() {
            console.log(
                'Mongoose connection disconnected');
	    });
		} else {
			console.log(err);
		}
	
	});
}


function storePolls(pollData) {
	console.log('storePoll function called')
	
	pollData = pollData.pollData;
	console.log('polldata createpoll route', pollData);
	console.log(Array.isArray(pollData));
	pollModel.remove({ userName: pollData[0].userName}, callback)
}


function callback(){
	console.log('callback', pollData);
	pollData.pollData.map(storePoll);
}


router.use('/', function(req, res, next) {

	if (!req.user) {
		res.redirect('/');
	}
	next();
})


router.get('/', function(req, res) {
	console.log('createpollnewejs', req.user.displayName);
	res.render('create-poll-new', {
		user: {
			name: req.user.displayName
		}
	})
});

router.post('/', function(req, res) {
	pollData = req.body;
	console.log('createpollnew route polldata', pollData)
	storePolls(pollData);
});

module.exports = router;


