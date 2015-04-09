'use strict';

var express = require('express');
var controller = require('./discipline.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/trees/:treemodel', controller.showTree);


module.exports = router;