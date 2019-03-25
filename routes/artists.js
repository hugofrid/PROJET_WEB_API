var express = require('express');
var router = express.Router();
var artist = require('../controllers/artist.controller');

/* GET artists listing. */
router.get('/', artist.findAll);

router.put('/', artist.create);

router.delete('/:artistId', artist.delete);

/* GET one artist */
router.get('/:artistId', artist.findOne);
/* update  one artist */
router.post('/:artistId', artist.update);

module.exports = router;