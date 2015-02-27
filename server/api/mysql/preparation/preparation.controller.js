'use strict';
var models = require('../');


// Get list of preparations
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Preparation.findAll().then(function(preparation){
  	return res.json(200, preparation);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single preparation
exports.show = function(req, res) {
  models.Preparation.find(req.params.id).then(function(preparation){
  	return res.json(200, preparation);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new preparation in the DB.
exports.create = function(req, res) {
  models.Preparation.create(req.body).then(function(preparation) {
    return res.json(201, preparation);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing preparation in the DB.
exports.update = function(req, res) {
  models.Preparation.find(req.params.id).then(function(preparation){
      if(!preparation) { return res.send(404); }  
	  return preparation.updateAttributes(req.body);	  	
  }).then(function(preparation){
  	return res.json(200, preparation);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a preparation from the DB.
exports.destroy = function(req, res) {
	
	models.Preparation.find(req.params.id).then(function(preparation){
		if(!preparation) { return res.send(404); }
		return preparation.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe preparation
exports.describe = function(req, res) {
  models.Preparation.describe().then(function(preparation){
	  console.log(preparation);
  	return res.json(200, preparation);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}