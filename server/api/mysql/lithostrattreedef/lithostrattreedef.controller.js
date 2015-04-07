'use strict';
var models = require('../');
var _ = require('lodash');

//var Lithostrattreedef = require('./lithostrattreedefitem.model');

// Get list of lithostrattreedefitems
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Lithostrattreedef.findAll(query).then(function(lithostrattreedef){
  	return res.json(200, lithostrattreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single lithostrattreedefitem
exports.show = function(req, res) {
  models.Lithostrattreedef.find(req.params.id).then(function(lithostrattreedef){
  	return res.json(200, lithostrattreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}