/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Geologictimeperiodtreedefitem = require('./geologictimeperiodtreedefitem.model');

exports.register = function(socket) {
  Geologictimeperiodtreedefitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Geologictimeperiodtreedefitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('geologictimeperiodtreedefitems:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('geologictimeperiodtreedefitems:remove', doc);
}