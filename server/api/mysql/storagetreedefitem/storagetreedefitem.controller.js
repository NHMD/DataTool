'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of storagetreedefitems
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Storagetreedefitem.findAll(query).then(function(storagetreedefitem){
  	return res.json(200, storagetreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single storagetreedefitem
exports.show = function(req, res) {
  models.Storagetreedefitem.find(req.params.id).then(function(storagetreedefitem){
  	return res.json(200, storagetreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}