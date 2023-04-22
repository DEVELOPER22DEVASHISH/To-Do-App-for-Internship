const express = require('express');


const { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo } = require('../controller/todo-controller.js');

const router = express.Router();


router.post('/add-todos', addTodo)
router.get('/getall-todos', getAllTodos);
router.get('/toggle-todos/:id', toggleTodoDone);
router.put('/update-todos/:id', updateTodo);
router.delete('/delete-todos/:id', deleteTodo);


module.exports = router;