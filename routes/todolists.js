var express = require('express');
var router = express.Router();
var todos = require('../controllers/todolists.controller');

/* GET notes listing. */
router.get('/', todos.findAll);

router.put('/', todos.createList);

router.post('/:listId',todos.addTodo);

router.delete('/:listId', todos.deleteList);

router.delete('/:listId/:todoId', todos.deleteTodo);

router.post('/:listId/:todoId', todos.toggleTodo);

module.exports = router;
