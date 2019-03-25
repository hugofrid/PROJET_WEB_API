var express = require('express');
var router = express.Router();
var artist = require('../controllers/artist.controller');

/* GET artists listing. */
router.get('/', artist.findAll);

router.put('/', artist.create);

router.delete('/:artistId', artist.delete);

module.exports = router;