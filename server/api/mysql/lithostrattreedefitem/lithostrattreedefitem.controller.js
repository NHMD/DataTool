'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of lithostrattreedefitems
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Lithostrattreedefitem.findAll(query).then(function(lithostrattreedefitem){
  	return res.json(200, lithostrattreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single lithostrattreedefitem
exports.show = function(req, res) {
  models.Lithostrattreedefitem.find(req.params.id).then(function(lithostrattreedefitem){
  	return res.json(200, lithostrattreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}