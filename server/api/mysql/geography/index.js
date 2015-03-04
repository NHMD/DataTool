'use strict';

var express = require('express');
var controller = require('./geography.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/parents', controller.showParents);


module.exports = router;