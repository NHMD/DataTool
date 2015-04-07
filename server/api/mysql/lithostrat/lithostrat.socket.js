/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lithostrat = require('./lithostrat.model');

exports.register = function(socket) {
  Lithostrat.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lithostrat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lithostrat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lithostrat:remove', doc);
}