'use strict';
var models = require('../');


// Get list of workbenchtemplates
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
//	models.Specifyuser.find(req.user.specifyUserId)
 // models.Workbenchtemplate.findAll(query)
	req.specifyuser.getWorkbenchtemplates().then(function(workbenchtemplates){
	
  	return res.json(200, workbenchtemplates);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single workbenchtemplate
exports.show = function(req, res) {
  models.Workbenchtemplate.find(req.params.id).then(function(workbenchtemplate){
  	return res.json(200, workbenchtemplate);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new workbenchtemplate in the DB.
exports.create = function(req, res) {
  models.Workbenchtemplate.create(req.body).then(function(workbenchtemplate) {
    return res.json(201, workbenchtemplate);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing workbenchtemplate in the DB.
exports.update = function(req, res) {
  models.Workbenchtemplate.find(req.params.id).then(function(workbenchtemplate){
      if(!workbenchtemplate) { return res.send(404); }  
	  return workbenchtemplate.updateAttributes(req.body);	  	
  }).then(function(workbenchtemplate){
  	return res.json(200, workbenchtemplate);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a workbenchtemplate from the DB.
exports.destroy = function(req, res) {
	
	models.Workbenchtemplate.find(req.params.id).then(function(workbenchtemplate){
		if(!workbenchtemplate) { return res.send(404); }
		return workbenchtemplate.destroy()
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

// Get list of workbenchtemplatemappingitems
exports.indexWorkbenchtemplatemappingitems = function(req, res) {
  models.Workbenchtemplate.find(req.params.id).then(function(workbenchtemplate){
	  return workbenchtemplate.getWorkbenchtemplatemappingitems({order: [['TableName', 'ASC']]});	
  }).then(function(workbenchtemplatemappingitems){
  	return res.json(200, workbenchtemplatemappingitems);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

