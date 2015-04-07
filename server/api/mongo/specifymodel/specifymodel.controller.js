/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /specifymodels              ->  index
 * GET     /specifymodels/:id          ->  show
 * We don´t allow PUT, POST and DELETE. (Read only)
 */

'use strict';

var _ = require('lodash');
var SpecifyModel = require('./specifymodel.model');

// Get list of specifymodels
exports.index = function(req, res) {
  SpecifyModel.find(function (err, specifymodels) {
    if(err) { return handleError(res, err); }
    return res.json(200, specifymodels);
  });
};

// Get a single specifymodel
exports.show = function(req, res) {
  SpecifyModel.findById(req.params.id, function (err, specifymodel) {
    if(err) { return handleError(res, err); }
    if(!specifymodel) { return res.send(404); }
    return res.json(specifymodel);
  });
};




function handleError(res, err) {
  return res.send(500, err);
}