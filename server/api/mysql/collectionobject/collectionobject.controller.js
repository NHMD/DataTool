'use strict';
var models = require('../');


// Get list of collectionobjects
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Collectionobject.findAll().then(function(collectionobject){
  	return res.json(200, collectionobject);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single collectionobject
exports.show = function(req, res) {
  models.Collectionobject.find(req.params.id).then(function(collectionobject){
  	return res.json(200, collectionobject);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new collectionobject in the DB.
exports.create = function(req, res) {
  models.Collectionobject.create(req.body).then(function(collectionobject) {
    return res.json(201, collectionobject);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing collectionobject in the DB.
exports.update = function(req, res) {
  models.Collectionobject.find(req.params.id).then(function(collectionobject){
      if(!collectionobject) { return res.send(404); }  
	  return collectionobject.updateAttributes(req.body);	  	
  }).then(function(collectionobject){
  	return res.json(200, collectionobject);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a collectionobject from the DB.
exports.destroy = function(req, res) {
	
	models.Collectionobject.find(req.params.id).then(function(collectionobject){
		if(!collectionobject) { return res.send(404); }
		return collectionobject.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe collectionobject
exports.describe = function(req, res) {
  models.Collectionobject.describe().then(function(collectionobject){
	  console.log(collectionobject);
  	return res.json(200, collectionobject);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}