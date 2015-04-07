/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lithostrattreedefitem = require('./lithostrattreedefitem.model');

exports.register = function(socket) {
  Lithostrattreedefitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lithostrattreedefitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lithostrattreedefitems:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lithostrattreedefitems:remove', doc);
}