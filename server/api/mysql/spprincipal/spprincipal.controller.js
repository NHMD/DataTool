'use strict';
var models = require('../');


// Get list of spprincipals
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Spprincipal.findAll({
		include: [{
			model: models.Collection
		}]
	}).then(function(spprincipal){
  	return res.json(200, spprincipal);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single spprincipal
exports.show = function(req, res) {
  models.Spprincipal.find(req.params.id).then(function(spprincipal){
  	return res.json(200, spprincipal);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new spprincipal in the DB.
exports.create = function(req, res) {
  models.Spprincipal.create(req.body).then(function(spprincipal) {
    return res.json(201, spprincipal);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing spprincipal in the DB.
exports.update = function(req, res) {
  models.Spprincipal.find(req.params.id).then(function(spprincipal){
      if(!spprincipal) { return res.send(404); }  
	  return spprincipal.updateAttributes(req.body);	  	
  }).then(function(spprincipal){
  	return res.json(200, spprincipal);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a spprincipal from the DB.
exports.destroy = function(req, res) {
	
	models.Spprincipal.find(req.params.id).then(function(spprincipal){
		if(!spprincipal) { return res.send(404); }
		return spprincipal.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

function handleError(res, err) {
  return res.send(500, err);
}