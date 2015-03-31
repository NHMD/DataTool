'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of storages
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
	models.Storage.findAll(query).then(function(storage) {
		return res.json(200, storage);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single storage
exports.show = function(req, res) {
	models.Storage.find(req.params.id).then(function(storage) {
		return res.json(200, storage);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

exports.showParents = function(req, res) {
	models.Storage.find(req.params.id).then(function(storage) {
		return storage.showParents(models);
	}).then(function(parents) {
		return res.json(200, parents);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
