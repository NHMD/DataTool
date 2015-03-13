/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /csvimports              ->  index
 * POST    /csvimports              ->  create
 * GET     /csvimports/:id          ->  show
 * PUT     /csvimports/:id          ->  update
 * DELETE  /csvimports/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var CsvImport = require('./csvimport.model');

// Get list of csvimports
exports.index = function(req, res) {
  CsvImport.find(function (err, csvimports) {
    if(err) { return handleError(res, err); }
    return res.json(200, csvimports);
  });
};

// Get a single csvimport
exports.show = function(req, res) {
  CsvImport.findById(req.params.id, function (err, csvimport) {
    if(err) { return handleError(res, err); }
    if(!csvimport) { return res.send(404); }
    return res.json(csvimport);
  });
};

// Creates a new csvimport in the DB.
exports.create = function(req, res) {
  CsvImport.create(req.body, function(err, csvimport) {
    if(err) { return handleError(res, err); }
    return res.json(201, csvimport);
  });
};

// Updates an existing csvimport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CsvImport.findById(req.params.id, function (err, csvimport) {
    if (err) { return handleError(res, err); }
    if(!csvimport) { return res.send(404); }
    var updated = _.merge(csvimport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, csvimport);
    });
  });
};

// Deletes a csvimport from the DB.
exports.destroy = function(req, res) {
  CsvImport.findById(req.params.id, function (err, csvimport) {
    if(err) { return handleError(res, err); }
    if(!csvimport) { return res.send(404); }
    csvimport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}