/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Taxontreedefitem = require('./geographytreedefitem.model');

exports.register = function(socket) {
  Taxontreedefitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Taxontreedefitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('geographytreedefitems:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('geographytreedefitems:remove', doc);
}