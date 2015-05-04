'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../../config/environment');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.hasRole('Manager'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('Manager'), controller.create);
router.put('/:id', auth.hasRole('Manager'), controller.update);


module.exports = router;
