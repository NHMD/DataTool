'use strict';

var express = require('express');
var controller = require('./geologictimeperiod.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/parents', controller.showParents);


module.exports = router;