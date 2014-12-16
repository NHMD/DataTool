/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Workbench = require('./workbench.model');

exports.register = function(socket) {
  Workbench.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Workbench.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('workbench:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('workbench:remove', doc);
}