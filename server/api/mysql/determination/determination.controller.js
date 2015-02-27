'use strict';
var models = require('../');


// Get list of determinations
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Determination.findAll().then(function(determination){
  	return res.json(200, determination);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single determination
exports.show = function(req, res) {
  models.Determination.find(req.params.id).then(function(determination){
  	return res.json(200, determination);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new determination in the DB.
exports.create = function(req, res) {
  models.Determination.create(req.body).then(function(determination) {
    return res.json(201, determination);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing determination in the DB.
exports.update = function(req, res) {
  models.Determination.find(req.params.id).then(function(determination){
      if(!determination) { return res.send(404); }  
	  return determination.updateAttributes(req.body);	  	
  }).then(function(determination){
  	return res.json(200, determination);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a determination from the DB.
exports.destroy = function(req, res) {
	
	models.Determination.find(req.params.id).then(function(determination){
		if(!determination) { return res.send(404); }
		return determination.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe determination
exports.describe = function(req, res) {
  models.Determination.describe().then(function(determination){
	  console.log(determination);
  	return res.json(200, determination);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}