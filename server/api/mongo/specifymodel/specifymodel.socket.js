/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var specifymodel = require('./specifymodel.model');

exports.register = function(socket) {
  specifymodel.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  specifymodel.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('specifymodel:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('specifymodel:remove', doc);
}