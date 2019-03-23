var express = require('express');
var router = express.Router();
var note = require('../controllers/note.controller');

/* GET notes listing. */
router.get('/', note.findAll);

router.put('/', note.create);

router.delete('/:noteId', note.delete);

module.exports = router;
