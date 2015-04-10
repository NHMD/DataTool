'use strict';

var express = require('express');
var controller = require('./specifyuser.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/' , /*auth.isAuthenticated(),*/ controller.index);
router.get('/:id',  auth.isAuthenticated(), controller.show);

router.get('/me/collections', auth.isAuthenticated(), controller.indexCollections);

module.exports = router;
