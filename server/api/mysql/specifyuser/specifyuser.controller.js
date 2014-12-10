'use strict';
var models = require('../');


// Get list of specifyusers
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Specifyuser.findAll().then(function(specifyuser){
  	return res.json(200, specifyuser);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single specifyuser
exports.show = function(req, res) {
  models.Specifyuser.find(req.params.id).then(function(specifyuser){
  	return res.json(200, specifyuser);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new specifyuser in the DB.
exports.create = function(req, res) {
  models.Specifyuser.create(req.body).then(function(specifyuser) {
    return res.json(201, specifyuser);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing specifyuser in the DB.
exports.update = function(req, res) {
  models.Specifyuser.find(req.params.id).then(function(specifyuser){
      if(!specifyuser) { return res.send(404); }  
	  return specifyuser.updateAttributes(req.body);	  	
  }).then(function(specifyuser){
  	return res.json(200, specifyuser);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a specifyuser from the DB.
exports.destroy = function(req, res) {
	
	models.Specifyuser.find(req.params.id).then(function(specifyuser){
		if(!specifyuser) { return res.send(404); }
		return specifyuser.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

function handleError(res, err) {
  return res.send(500, err);
}