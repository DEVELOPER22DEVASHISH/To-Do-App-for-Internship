import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuid } from "uuid";

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        // can also be in progress or closed
        status: "todo"
    });

    console.log(task);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3)
            return toast.error("A Task must have more than 3 characters");

        if (task.name.length > 100)
            return toast.error("A Task must not be more than 100 characters");

        setTasks((prev) => {
            const list = [...tasks, task];

            localStorage.setItem("tasks", JSON.stringify(list));

            return list;
        });

        toast.success("Task Created");

        setTask({
            id: "",
            name: "",
            // can also be in progress or closed
            status: "todo"
        });

    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1 "
                value={task.name}
                onChange={(e) => setTask({ ...task, id: uuid(), name: e.target.value })}
            />
            <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    );
};

export default CreateTask