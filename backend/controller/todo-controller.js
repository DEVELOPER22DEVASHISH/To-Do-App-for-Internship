const Todo = require('../model/Todo.js');

exports.addTodo = async (_req, res) => {
    try {
        const newTodo = await Todo.create({
            text: req.body.text,
            createdAt: Date.now()
        })

        await newTodo.save();

        return res.status(200).send(newTodo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getAllTodos = async (_req, res) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': -1 })

        return res.status(200).send(todos);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.toggleTodoDone = async (_req, res) => {
    try {
        const todoRef = await Todo.findById(req.params.id);

        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { done: !todoRef.done }
        )

        await todo.save();

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.updateTodo = async (_req, _res) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { text: req.body.text }
        )

        const todo = await Todo.findById(req.params.id);

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.deleteTodo = async (_req, _res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}