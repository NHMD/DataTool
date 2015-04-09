'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var field = new Schema({
	name: String,
	column: String,
	indexed: Boolean,
	unique: Boolean,
	required: Boolean,
	type: String,
	length: Number
});

var relationship = new Schema({
	name: String,
	type: String,
	required: Boolean,
	dependent: Boolean,
	relatedModelName: String,
	otherSideName: String,
	column: String
});

var fieldAlias = new Schema({
	aname: String,
	vname: String,
});

module.exports = new Schema({
	classname: String,
	table: String,
	tableId: Number,
	view: String,
	searchDialog: String,
	system: Boolean,
	idColumn: String,
	idFieldName: String,
	fields: [field],
	relationships: [relationship],
	fieldAliases: [fieldAlias]

}, { collection: 'datamodels' });
