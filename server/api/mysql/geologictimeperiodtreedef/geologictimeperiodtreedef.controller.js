'use strict';
var models = require('../');
var _ = require('lodash');

//var Geologictimeperiodtreedef = require('./geologictimeperiodtreedefitem.model');

// Get list of geologictimeperiodtreedefitems
exports.index = function(req, res) {
	var query = (req.query._query) ? {where: JSON.parse(req.query._query)} : undefined;

  models.Geologictimeperiodtreedef.findAll(query).then(function(geologictimeperiodtreedef){
  	return res.json(200, geologictimeperiodtreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single geologictimeperiodtreedefitem
exports.show = function(req, res) {
  models.Geologictimeperiodtreedef.find(req.params.id).then(function(geologictimeperiodtreedef){
  	return res.json(200, geologictimeperiodtreedef);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}