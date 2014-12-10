/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Specifyuser = require('./specifyuser.model');

exports.register = function(socket) {
  Specifyuser.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Specifyuser.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('specifyuser:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('specifyuser:remove', doc);
}