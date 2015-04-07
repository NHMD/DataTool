/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lithostrattreedef = require('./lithostrattreedef.model');

exports.register = function(socket) {
  Lithostrattreedef.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lithostrattreedef.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lithostrattreedef:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lithostrattreedef:remove', doc);
}