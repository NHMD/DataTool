'use strict';
var mongoose = require('mongoose'),
	SpecifiModelSchema = require('./specifymodel.schema');

module.exports = mongoose.model('SpecifyModel', SpecifiModelSchema);