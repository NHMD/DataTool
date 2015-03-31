'use strict';
var models = require('../');


// Get list of divisions
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Division.findAll().then(function(division){
  	return res.json(200, division);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single division
exports.show = function(req, res) {
  models.Division.find(req.params.id).then(function(division){
  	return res.json(200, division);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new division in the DB.
exports.create = function(req, res) {
  models.Division.create(req.body).then(function(division) {
    return res.json(201, division);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing division in the DB.
exports.update = function(req, res) {
  models.Division.find(req.params.id).then(function(division){
      if(!division) { return res.send(404); }  
	  return division.updateAttributes(req.body);	  	
  }).then(function(division){
  	return res.json(200, division);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a division from the DB.
exports.destroy = function(req, res) {
	
	models.Division.find(req.params.id).then(function(division){
		if(!division) { return res.send(404); }
		return division.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe division
exports.describe = function(req, res) {
  models.Division.describe().then(function(division){
	  console.log(division);
  	return res.json(200, division);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}