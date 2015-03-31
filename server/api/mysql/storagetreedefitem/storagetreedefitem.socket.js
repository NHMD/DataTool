/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Storagetreedefitem = require('./storagetreedefitem.model');

exports.register = function(socket) {
  Storagetreedefitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Storagetreedefitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('storagetreedefitems:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('storagetreedefitems:remove', doc);
}