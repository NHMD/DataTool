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

router.get('/datasets/:collname/process', controller.process);
router.get('/datasets/:collname/objects', controller.indexObjects);
router.get('/datasets/:collname/objects/:id', controller.findObject);
router.get('/datasets/:collname', controller.find);
router.post('/datasets/:collname/mappings', auth.isAuthenticated(), controller.saveCsvMapping);
module.exports = router;