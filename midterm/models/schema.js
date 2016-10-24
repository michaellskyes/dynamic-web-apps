var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments = new Schema({
	name: [String],
    comment: [String],
	dateCreated: {type: Date, default: Date.now}

});
