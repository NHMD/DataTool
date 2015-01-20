'use strict';
var models = require('../');
var qp = require('../nestedQueryParser');

// Get list of workbenchdataitems
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Workbenchdataitem.findAll(query).then(function(workbenchdataitem){
  	return res.json(200, workbenchdataitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single workbenchdataitem
exports.show = function(req, res) {
  models.Workbenchdataitem.find(req.params.id).then(function(workbenchdataitem){
  	return res.json(200, workbenchdataitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new workbenchdataitem in the DB.
exports.create = function(req, res) {
  models.Workbenchdataitem.create(req.body).then(function(workbenchdataitem) {
    return res.json(201, workbenchdataitem);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing workbenchdataitem in the DB.
exports.update = function(req, res) {
	
  models.Workbenchdataitem.find(req.params.id).then(function(workbenchdataitem){
      if(!workbenchdataitem) { return res.send(404); }  
	  return workbenchdataitem.authorize(models, req.specifyuser).then(function(){
		  return workbenchdataitem.updateAttributes(req.body);
	  });	  	
  })
  .then(function(workbenchdataitem){
  	return res.json(200, workbenchdataitem);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a workbenchdataitem from the DB.
exports.destroy = function(req, res) {
	
	models.Workbenchdataitem.find(req.params.id).then(function(workbenchdataitem){
		if(!workbenchdataitem) { return res.send(404); }
  	  return workbenchdataitem.authorize(models, req.specifyuser).then(function(){
  		  return workbenchdataitem.destroy();
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