/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Workbenchrow = require('./workbenchrow.model');

exports.register = function(socket) {
  Workbenchrow.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Workbenchrow.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('workbenchrow:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('workbenchrow:remove', doc);
}