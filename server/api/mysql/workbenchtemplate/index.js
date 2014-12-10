'use strict';

var express = require('express');
var controller = require('./workbenchtemplate.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);


// associations:
router.get('/:id/workbenchtemplatemappingitems', auth.isAuthenticated(), controller.indexWorkbenchtemplatemappingitems);

module.exports = router;