'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of geographytreedefitems
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Geographytreedefitem.findAll(query).then(function(geographytreedefitem){
  	return res.json(200, geographytreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single geographytreedefitem
exports.show = function(req, res) {
  models.Geographytreedefitem.find(req.params.id).then(function(geographytreedefitem){
  	return res.json(200, geographytreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}