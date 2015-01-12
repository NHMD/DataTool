'use strict';

var express = require('express');
var controller = require('./collection.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/discipline', controller.showDiscipline);


module.exports = router;