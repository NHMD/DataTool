'use strict';
var mongoose = require('mongoose'),
	HistorySchema = require('./history.schema');

module.exports = mongoose.model('History', HistorySchema);
