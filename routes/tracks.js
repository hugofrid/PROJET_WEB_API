var express = require('express');
var router = express.Router();
var track = require('../controllers/track.controller');

/* GET tracks listing. */
router.get('/', track.findAll);

router.put('/', track.create);

router.delete('/:trackId', track.delete);

module.exports = router;