'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var historyAction = new Schema({
	timestamp: Date,
	fromUserId: Number,
	toUserId: Number,
	message : String
});

module.exports = new Schema({
	workbenchId: Number,	//Workbench.WorkbenchID
	name: String,			//Workbench.Name
	actions : [historyAction]
}, { collection: 'workbenchHistory' });
	

