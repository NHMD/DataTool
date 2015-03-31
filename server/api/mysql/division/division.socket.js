/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var division = require('./division.model');

exports.register = function(socket) {
  Division.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Division.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('division:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('division:remove', doc);
}