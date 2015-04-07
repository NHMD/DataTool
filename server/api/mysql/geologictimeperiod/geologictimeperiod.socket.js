/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Geologictimeperiod = require('./geologictimeperiod.model');

exports.register = function(socket) {
  Geologictimeperiod.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Geologictimeperiod.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('geologictimeperiod:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('geologictimeperiod:remove', doc);
}