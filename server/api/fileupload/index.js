'use strict';

var express = require('express');
var multer  = require('multer');
var controller = require('./fileupload.controller');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');
var uploaddir = config.tempuploaddir;

var router = express.Router();


router.post('/', [ multer({ dest: uploaddir }), auth.isAuthenticated() , controller.getFile]);
//router.get('/collections/', controller.index);
router.get('/collections/:collname', controller.find);
router.get('/collections/:collname/aggregate', controller.aggr);
router.get('/collections/:collname/objects/:id', controller.findObject);
router.get('/collections/:collname/objects', controller.indexObjects);

module.exports = router;