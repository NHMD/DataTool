'use strict';
var models = require('../');
var _ = require('lodash');
var Promise = require('bluebird');
// Get list of agents
exports.index = function(req, res) {

	var modelNames = _.filter(Object.keys(models), function(str) {
		return str !== 'sequelize' && str !== 'Sequelize';
	});

	var datamodels = _.map(modelNames, function(modelName) {
		return models[modelName].describe().then(function(fields) {

			return {
				name: modelName,
				fields: fields
			}
		}).
		catch (function(err) {
			handleError(res, err);
		});
	});

	Promise.all(datamodels).then(function(datamodels){
		
		var treeDefPattern = /treedef/i ;
		var treeDefItemPattern = /treedefitem/i ;
		
		_.each(datamodels, function(value, key, datamodels){
			
		})
	})
	.then(function(datamodels) {
		return res.json(200, datamodels);
	})
	

};

// Get  fields for a model
exports.show = function(req, res) {
	console.log(JSON.stringify(req.params))
	var model = req.params.model.charAt(0).toUpperCase() + req.params.model.slice(1);
	models[model].describe().then(function(fields) {

		return res.json(200, fields);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};


function handleError(res, err) {
	return res.send(500, err);
}
