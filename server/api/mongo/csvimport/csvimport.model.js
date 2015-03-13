'use strict';
var mongoose = require('mongoose'),
	CsvImportSchema = require('./csvimport.schema');

module.exports = mongoose.model('CsvImport', CsvImportSchema);