'use strict';
var models = require('../');
var _ = require('lodash');

//var Taxontreedefitem = require('./taxontreedefitem.model');

// Get list of taxontreedefitems
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Taxontreedefitem.findAll(query).then(function(taxontreedef){
  	return res.json(200, taxontreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single taxontreedefitem
exports.show = function(req, res) {
  models.Taxontreedefitem.find(req.params.id).then(function(taxontreedef){
  	return res.json(200, taxontreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}