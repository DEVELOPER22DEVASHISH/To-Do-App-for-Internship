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


exports.deleteTodo = async (_req, _res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}