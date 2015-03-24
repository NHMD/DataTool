'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = new Schema({
  name: String,
  collectionname: String,
  active: Boolean
});