const express = require('express');


const { addTodo, deleteTodo } = require('../controller/todo-controller.js');

const router = express.Router();


router.post('/create-todos', addTodo)

router.delete('/delete-todos/:id', deleteTodo);


module.exports = router;