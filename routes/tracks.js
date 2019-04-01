var express = require('express');
var router = express.Router();
var track = require('../controllers/track.controller');
var album = require('../controllers/album.controller')

/* GET tracks listing. */
router.get('/', track.findAll);

router.put('/', track.create);

router.delete('/:trackId', track.delete);

/* GET one track */
router.get('/:trackId', track.findOne);
/* update  one track */
router.post('/:trackId', track.updateLikes);

module.exports = router;