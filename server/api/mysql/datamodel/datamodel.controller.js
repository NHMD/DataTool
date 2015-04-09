'use strict';
var models = require('../');
var _ = require('lodash');
var Promise = require('bluebird');
var datamapper = require('../../../components/datamapper');

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
		// Check if model is a treedef or treedefitem and attach to relevant tree table. E.g. attach Taxontreedefitem and taxontreedef to Taxon
		var treeDefPattern = /treedef/i ;
		
		for(var i=0; i<datamodels.length; i++){
			
			if(treeDefPattern.test(datamodels[i].name)){
				
				var treeTableName = datamodels[i].name.split('treedef')[0];
				
				var treeTable = datamodels.filter(function(e){ return e.name === treeTableName})[0];
				
				treeTable[datamodels[i].name] = datamodels[i];
				
				
			}
			// Filter out treedef and treedefitems for ui (they are now attached to their mother tree table)
		};
		return datamodels.filter(function(e){
			return !treeDefPattern.test(e.name);
		});
	})
	.then(function(datamodels) {
		if (req.query.treesOnly){
		datamodels =	datamodels.filter(function(e){
						return datamapper.isTree(e.name);
					});
		}
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
