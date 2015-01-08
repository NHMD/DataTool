/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Taxon = require('./taxon.model');

exports.register = function(socket) {
  Taxon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Taxon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('taxon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('taxon:remove', doc);
}