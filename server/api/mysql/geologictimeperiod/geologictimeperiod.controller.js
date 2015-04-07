'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of geologictimeperiods
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
	models.Geologictimeperiod.findAll(query).then(function(geologictimeperiod) {
		return res.json(200, geologictimeperiod);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single geologictimeperiod
exports.show = function(req, res) {
	models.Geologictimeperiod.find(req.params.id).then(function(geologictimeperiod) {
		return res.json(200, geologictimeperiod);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

exports.showParents = function(req, res) {
	models.Geologictimeperiod.find(req.params.id).then(function(geologictimeperiod) {
		return geologictimeperiod.showParents(models);
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
