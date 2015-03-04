'use strict';
var models = require('../');
var _ = require('lodash');
//var Collection = require('./collection.model');

// Get list of collections
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;
	
	
  models.Collection.findAll({include: [{
					model: models.Discipline
				}]}).then(function(collection){
  	return res.json(200, collection);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single collection
exports.show = function(req, res) {
  models.Collection.find(req.params.id).then(function(collection){
  	return res.json(200, collection);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

exports.showDiscipline = function(req, res) {
  models.Collection.find(req.params.id).then(function(collection){
  	return collection.getDiscipline(models, req.specifyuser)
  }).then(function(discipline){
  	return res.json(200, discipline);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Describe agent
exports.describe = function(req, res) {
  models.Collection.describe().then(function(collection){
	  console.log(collection);
  	return res.json(200, collection);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}