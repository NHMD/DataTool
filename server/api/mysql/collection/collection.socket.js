/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Collection = require('./collection.model');

exports.register = function(socket) {
  Collection.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Collection.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('collection:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('collection:remove', doc);
}