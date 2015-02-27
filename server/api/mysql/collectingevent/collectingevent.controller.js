'use strict';
var models = require('../');


// Get list of collectingevents
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Collectingevent.findAll().then(function(collectingevent){
  	return res.json(200, collectingevent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single collectingevent
exports.show = function(req, res) {
  models.Collectingevent.find(req.params.id).then(function(collectingevent){
  	return res.json(200, collectingevent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new collectingevent in the DB.
exports.create = function(req, res) {
  models.Collectingevent.create(req.body).then(function(collectingevent) {
    return res.json(201, collectingevent);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing collectingevent in the DB.
exports.update = function(req, res) {
  models.Collectingevent.find(req.params.id).then(function(collectingevent){
      if(!collectingevent) { return res.send(404); }  
	  return collectingevent.updateAttributes(req.body);	  	
  }).then(function(collectingevent){
  	return res.json(200, collectingevent);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a collectingevent from the DB.
exports.destroy = function(req, res) {
	
	models.Collectingevent.find(req.params.id).then(function(collectingevent){
		if(!collectingevent) { return res.send(404); }
		return collectingevent.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe collectingevent
exports.describe = function(req, res) {
  models.Collectingevent.describe().then(function(collectingevent){
	  console.log(collectingevent);
  	return res.json(200, collectingevent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}