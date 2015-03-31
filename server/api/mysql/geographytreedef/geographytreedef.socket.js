/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Geographytreedef = require('./geographytreedef.model');

exports.register = function(socket) {
  Geographytreedef.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Geographytreedef.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('geographytreedef:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('geographytreedef:remove', doc);
}