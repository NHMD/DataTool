'use strict';
var models = require('../');


// Get list of institutions
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Institution.findAll().then(function(institution){
  	return res.json(200, institution);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single institution
exports.show = function(req, res) {
  models.Institution.find(req.params.id).then(function(institution){
  	return res.json(200, institution);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new institution in the DB.
exports.create = function(req, res) {
  models.Institution.create(req.body).then(function(institution) {
    return res.json(201, institution);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing institution in the DB.
exports.update = function(req, res) {
  models.Institution.find(req.params.id).then(function(institution){
      if(!institution) { return res.send(404); }  
	  return institution.updateAttributes(req.body);	  	
  }).then(function(institution){
  	return res.json(200, institution);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a institution from the DB.
exports.destroy = function(req, res) {
	
	models.Institution.find(req.params.id).then(function(institution){
		if(!institution) { return res.send(404); }
		return institution.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe institution
exports.describe = function(req, res) {
  models.Institution.describe().then(function(institution){
	  console.log(institution);
  	return res.json(200, institution);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}