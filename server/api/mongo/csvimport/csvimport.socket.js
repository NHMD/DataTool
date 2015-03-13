/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var csvimport = require('./csvimport.model');

exports.register = function(socket) {
  csvimport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  csvimport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('csvimport:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('csvimport:remove', doc);
}