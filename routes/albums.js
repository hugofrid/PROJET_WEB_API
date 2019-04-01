var express = require('express');
var router = express.Router();
var album = require('../controllers/album.controller');

/* GET albums listing. */
router.get('/', album.findAll);

router.put('/', album.create);

router.delete('/:albumId', album.delete);

/* GET one album */
router.get('/:albumId', album.findOne);
/* update  one album */
//router.post('/:albumId', album.update);
router.get('/likes/count', album.findLikesAlbum);

module.exports = router;