/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /historys              ->  index
 * POST    /historys              ->  create
 * GET     /historys/:id          ->  show
 * PUT     /historys/:id          ->  update
 * DELETE  /historys/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var History = require('./history.model');

// Get list of historys
exports.index = function(req, res) {
  History.find(function (err, histories) {
    if(err) { return handleError(res, err); }
    return res.json(200, histories);
  });
};

// Get a single history
exports.show = function(req, res) {
  History.findById(req.params.id, function (err, history) {
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    return res.json(history);
  });
};

// Creates a new history in the DB.
exports.create = function(req, res) {
  History.create(req.body, function(err, history) {
    if(err) { return handleError(res, err); }
    return res.json(201, history);
  });
};

// Updates an existing history in the DB.
// using _.extend in order to save actions properly
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  History.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.extend(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a history from the DB.
exports.destroy = function(req, res) {
  History.findById(req.params.id, function (err, history) {
    if(err) { return handleError(res, err); }
    if(!history) { return res.send(404); }
    history.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
