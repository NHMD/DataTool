/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Spprincipal = require('./spprincipal.model');

exports.register = function(socket) {
  Spprincipal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Spprincipal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('spprincipal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('spprincipal:remove', doc);
}