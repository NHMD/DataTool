'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of lithostrats
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
	models.Lithostrat.findAll(query).then(function(lithostrat) {
		return res.json(200, lithostrat);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single lithostrat
exports.show = function(req, res) {
	models.Lithostrat.find(req.params.id).then(function(lithostrat) {
		return res.json(200, lithostrat);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

exports.showParents = function(req, res) {
	models.Lithostrat.find(req.params.id).then(function(lithostrat) {
		return lithostrat.showParents(models);
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
