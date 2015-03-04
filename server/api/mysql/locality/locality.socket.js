/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Agent = require('./locality.model');

exports.register = function(socket) {
  Agent.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Agent.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('locality:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('locality:remove', doc);
}