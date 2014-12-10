'use strict';
var models = require('../');

// Get list of workbenchtemplatemappingitems
exports.index = function(req, res) {
	console.log(req.query)
  models.Workbenchtemplatemappingitem.findAll({where: req.query}).then(function(workbenchtemplatemappingitem){
  	return res.json(200, workbenchtemplatemappingitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single workbenchtemplatemappingitem
exports.show = function(req, res) {
  models.Workbenchtemplatemappingitem.find(req.params.id).then(function(workbenchtemplatemappingitem){
  	return res.json(200, workbenchtemplatemappingitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new workbenchtemplatemappingitem in the DB.
exports.create = function(req, res) {
  models.Workbenchtemplatemappingitem.create(req.body).then(function(workbenchtemplatemappingitem) {
    return res.json(201, workbenchtemplatemappingitem);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing workbenchtemplatemappingitem in the DB.
exports.update = function(req, res) {
  models.Workbenchtemplatemappingitem.find(req.params.id).then(function(workbenchtemplatemappingitem){
      if(!workbenchtemplatemappingitem) { return res.send(404); }  
	  return workbenchtemplatemappingitem.updateAttributes(req.body);	  	
  }).then(function(workbenchtemplatemappingitem){
  	return res.json(200, workbenchtemplatemappingitem);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a workbenchtemplatemappingitem from the DB.
exports.destroy = function(req, res) {
	
	models.Workbenchtemplatemappingitem.find(req.params.id).then(function(workbenchtemplatemappingitem){
		if(!workbenchtemplatemappingitem) { return res.send(404); }
		return workbenchtemplatemappingitem.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

function handleError(res, err) {
  return res.send(500, err);
}