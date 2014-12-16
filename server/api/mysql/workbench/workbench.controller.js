'use strict';
var models = require('../');


// Get list of workbenchs
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
//	models.Specifyuser.find(req.user.specifyUserId)
 // models.Workbench.findAll(query)
	models.Workbench.findAll(
		{ 
		where:{ "SpecifyUserID": req.specifyuser.SpecifyUserID}, 
		include: [{model: models.Workbenchtemplate}] 
		}
	).then(function(workbenches){
	
  	return res.json(200, workbenches);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single workbench
exports.show = function(req, res) {
  models.Workbench.find(req.params.id).then(function(workbench){
  	return res.json(200, workbench);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new workbench in the DB.
exports.create = function(req, res) {
  models.Workbench.create(req.body).then(function(workbench) {
    return res.json(201, workbench);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing workbench in the DB.
exports.update = function(req, res) {
  models.Workbench.find(req.params.id).then(function(workbench){
      if(!workbench) { return res.send(404); }  
	  return workbench.updateAttributes(req.body);	  	
  }).then(function(workbench){
  	return res.json(200, workbench);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a workbench from the DB.
exports.destroy = function(req, res) {
	
	models.Workbench.find(req.params.id).then(function(workbench){
		if(!workbench) { return res.send(404); }
		return workbench.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};


function handleError(res, err) {
  return res.send(500, err);
}

// Associations

// Get list of workbenchrows
exports.indexWorkbenchrows = function(req, res) {
  models.Workbench.find(req.params.id).then(function(workbench){
	  return workbench.getWorkbenchrows();	
  }).then(function(workbenchrows){
  	return res.json(200, workbenchrows);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get list of workbenchdataitems
exports.indexWorkbenchDataItems = function(req, res) {
  models.Workbenchdataitem.getByWorkbenchID(req.params.id, models).then(function(workbenchdataitems){
	  return res.json(200, workbenchdataitems);
  }).catch(function(err){
	  handleError(res, err);
  });
};




