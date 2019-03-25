var express = require('express');
var router = express.Router();
var album = require('../controllers/album.controller');

/* GET albums listing. */
router.get('/', album.findAll);

router.put('/', album.create);

router.delete('/:albumId', album.delete);

module.exports = router;