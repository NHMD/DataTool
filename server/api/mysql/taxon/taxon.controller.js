'use strict';
var models = require('../');
var _ = require('lodash');
//var Taxon = require('./taxon.model');

// Get list of taxons
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Taxon.findAll(query).then(function(taxon){
  	return res.json(200, taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single taxon
exports.show = function(req, res) {
  models.Taxon.find(req.params.id).then(function(taxon){
  	return res.json(200, taxon);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}