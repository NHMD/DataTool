/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Storage = require('./storage.model');

exports.register = function(socket) {
  Storage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Storage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('storage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('storage:remove', doc);
}