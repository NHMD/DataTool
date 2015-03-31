'use strict';
var models = require('../');
var _ = require('lodash');

//var Storagetreedef = require('./storagetreedefitem.model');

// Get list of storagetreedefitems
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Storagetreedef.findAll(query).then(function(storagetreedef){
  	return res.json(200, storagetreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single storagetreedefitem
exports.show = function(req, res) {
  models.Storagetreedef.find(req.params.id).then(function(storagetreedef){
  	return res.json(200, storagetreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}