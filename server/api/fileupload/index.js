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
router.get('/datasetsxyz/:collname', auth.isAuthenticated(), controller.processToSp);

router.post('/datasets/:collname/processtree', auth.isAuthenticated(), controller.processtree);
router.post('/datasets/:collname/process', auth.isAuthenticated(), controller.process);
router.get('/datasets/:collname/objects', controller.indexObjects);
router.get('/datasets/:collname/objects/:id', controller.findObject);
router.get('/datasets/:collname/fields', controller.getFields); //
router.post('/datasets/:collname/actions', controller.postAction); //
router.post('/datasets/:collname/update', controller.updateObject); //
router.post('/datasets/:collname/delete', controller.deleteObject); //
router.get('/datasets/:collname', controller.find);
router.post('/datasets/:collname/mappings', auth.isAuthenticated(), controller.saveCsvMapping);
router.delete('/datasets/:collname', auth.isAuthenticated(), controller.deleteCsv);
router.delete('/datasets/:collname/mappings', auth.isAuthenticated(), controller.deleteCsvMapping);

router.post('/datasets/:collname/specifycollection', auth.isAuthenticated(), controller.saveSpecifyCollection);
module.exports = router;
