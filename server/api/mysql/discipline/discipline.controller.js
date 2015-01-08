'use strict';
var models = require('../');

//var Discipline = require('./discipline.model');

// Get list of disciplines
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Discipline.findAll(query).then(function(discipline){
  	return res.json(200, discipline);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single discipline
exports.show = function(req, res) {
  models.Discipline.find(req.params.id).then(function(discipline){
  	return res.json(200, discipline);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}