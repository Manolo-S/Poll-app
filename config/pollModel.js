var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollItemSchema = new Schema({
    categorie: String,
    votes: Number,
    _id: false
});

var PollSchema = new Schema({
	pollNumber: String,
	userName: String,
    pollName: String,
    pollItems: [PollItemSchema]
});

module.exports = mongoose.model('polls', PollSchema);





