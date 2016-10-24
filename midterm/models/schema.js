var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var picSchema = new Schema({
	imageNames: [String],
	dateCreated: {type: Date, default: Date.now},

});
