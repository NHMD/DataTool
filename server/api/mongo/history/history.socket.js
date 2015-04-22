/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var history = require('./history.model');

exports.register = function(socket) {
  history.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  history.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('history:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('history:remove', doc);
}
