'use strict';
var models = require('../');


// Get list of localitys
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Locality.findAll().then(function(locality){
  	return res.json(200, locality);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single locality
exports.show = function(req, res) {
  models.Locality.find(req.params.id).then(function(locality){
  	return res.json(200, locality);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new locality in the DB.
exports.create = function(req, res) {
  models.Locality.create(req.body).then(function(locality) {
    return res.json(201, locality);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing locality in the DB.
exports.update = function(req, res) {
  models.Locality.find(req.params.id).then(function(locality){
      if(!locality) { return res.send(404); }  
	  return locality.updateAttributes(req.body);	  	
  }).then(function(locality){
  	return res.json(200, locality);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a locality from the DB.
exports.destroy = function(req, res) {
	
	models.Locality.find(req.params.id).then(function(locality){
		if(!locality) { return res.send(404); }
		return locality.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe locality
exports.describe = function(req, res) {
  models.Locality.describe().then(function(locality){
	  console.log(locality);
  	return res.json(200, locality);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}