/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var institution = require('./institution.model');

exports.register = function(socket) {
  Institution.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Institution.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('institution:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('institution:remove', doc);
}