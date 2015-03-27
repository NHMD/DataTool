'use strict';
var models = require('../');
var _ = require('lodash');

//var Geographytreedef = require('./geographytreedefitem.model');

// Get list of geographytreedefitems
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Geographytreedef.findAll(query).then(function(geographytreedef){
  	return res.json(200, geographytreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single geographytreedefitem
exports.show = function(req, res) {
  models.Geographytreedef.find(req.params.id).then(function(geographytreedef){
  	return res.json(200, geographytreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}