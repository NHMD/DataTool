/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Agent = require('./preparation.model');

exports.register = function(socket) {
  Agent.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Agent.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('preparation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('preparation:remove', doc);
}