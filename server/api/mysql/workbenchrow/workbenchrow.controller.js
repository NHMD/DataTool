'use strict';
var models = require('../');
var _ = require('lodash');
//var Workbenchrow = require('./workbenchrow.model');

// Get list of workbenchrows
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;
	query = _.merge(query, {include: [{model: models.Workbenchdataitem}] 
		});
		console.log(query);	
  models.Workbenchrow.findAll(query).then(function(workbenchrow){
  	return res.json(200, workbenchrow);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single workbenchrow
exports.show = function(req, res) {
  models.Workbenchrow.find(req.params.id).then(function(workbenchrow){
  	return res.json(200, workbenchrow);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new workbenchrow in the DB.
exports.create = function(req, res) {
  models.Workbenchrow.create(req.body).then(function(workbenchrow) {
    return res.json(201, workbenchrow);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing workbenchrow in the DB.
exports.update = function(req, res) {
	
  models.Workbenchrow.find(req.params.id).then(function(workbenchrow){
      if(!workbenchrow) { return res.send(404); }  
	  return workbenchrow.authorize(models, req.specifyuser).then(function(){
		  return workbenchrow.updateAttributes(req.body);
	  });	  	
  })
  .then(function(workbenchrow){
  	return res.json(200, workbenchrow);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a workbenchrow from the DB.
exports.destroy = function(req, res) {
	console.log("Deleting wbrow "+req.params.id)
	models.Workbenchrow.find(req.params.id).then(function(workbenchrow){
		if(!workbenchrow) { return res.send(404); }
		
  	  return workbenchrow.authorize(models, req.specifyuser).then(function(){
  		  return workbenchrow.destroy(models);
  	  });
		
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

function handleError(res, err) {
  return res.send(500, err);
}