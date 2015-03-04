'use strict';
var models = require('../');


// Get list of collectors
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Collector.findAll().then(function(collector){
  	return res.json(200, collector);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single collector
exports.show = function(req, res) {
  models.Collector.find(req.params.id).then(function(collector){
  	return res.json(200, collector);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new collector in the DB.
exports.create = function(req, res) {
  models.Collector.create(req.body).then(function(collector) {
    return res.json(201, collector);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing collector in the DB.
exports.update = function(req, res) {
  models.Collector.find(req.params.id).then(function(collector){
      if(!collector) { return res.send(404); }  
	  return collector.updateAttributes(req.body);	  	
  }).then(function(collector){
  	return res.json(200, collector);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a collector from the DB.
exports.destroy = function(req, res) {
	
	models.Collector.find(req.params.id).then(function(collector){
		if(!collector) { return res.send(404); }
		return collector.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe collector
exports.describe = function(req, res) {
  models.Collector.describe().then(function(collector){
	  console.log(collector);
  	return res.json(200, collector);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}