/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Discipline = require('./discipline.model');

exports.register = function(socket) {
  Discipline.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Discipline.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('discipline:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('discipline:remove', doc);
}