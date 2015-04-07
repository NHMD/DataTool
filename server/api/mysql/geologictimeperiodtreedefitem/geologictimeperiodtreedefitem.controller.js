'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of geologictimeperiodtreedefitems
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
  models.Geologictimeperiodtreedefitem.findAll(query).then(function(geologictimeperiodtreedefitem){
  	return res.json(200, geologictimeperiodtreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};

// Get a single geologictimeperiodtreedefitem
exports.show = function(req, res) {
  models.Geologictimeperiodtreedefitem.find(req.params.id).then(function(geologictimeperiodtreedefitem){
  	return res.json(200, geologictimeperiodtreedefitem);	
  }).catch(function(err){
	  handleError(res, err);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}