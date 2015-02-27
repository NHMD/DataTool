'use strict';
var models = require('../');


// Get list of agents
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
  models.Agent.findAll().then(function(agent){
  	return res.json(200, agent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single agent
exports.show = function(req, res) {
  models.Agent.find(req.params.id).then(function(agent){
  	return res.json(200, agent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Creates a new agent in the DB.
exports.create = function(req, res) {
  models.Agent.create(req.body).then(function(agent) {
    return res.json(201, agent);
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Updates an existing agent in the DB.
exports.update = function(req, res) {
  models.Agent.find(req.params.id).then(function(agent){
      if(!agent) { return res.send(404); }  
	  return agent.updateAttributes(req.body);	  	
  }).then(function(agent){
  	return res.json(200, agent);
  }).catch(function(err){
	  handleError(res, err);
  });
  
};

// Deletes a agent from the DB.
exports.destroy = function(req, res) {
	
	models.Agent.find(req.params.id).then(function(agent){
		if(!agent) { return res.send(404); }
		return agent.destroy()
	}).then(function(){
		return res.send(204);
	}).catch(function(err){
	  handleError(res, err);
  });
	
};

// Describe agent
exports.describe = function(req, res) {
  models.Agent.describe().then(function(agent){
	  console.log(agent);
  	return res.json(200, agent);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}