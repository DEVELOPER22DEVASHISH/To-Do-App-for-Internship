import React, { useEffect } from 'react';
import { useState } from "react";

const ListTasks = ({ tasks, setTasks }) => {

    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {

        const fTodos = tasks.filter((task) => task.status === "todos");
        const fInProgress = tasks.filter((task) => task.status === "inprogress");
        const fClosed = tasks.filter((task) => task.status === "closed");

        setTodos(fTodos);
        setInProgress(fInProgress);
        setClosed(fClosed);
    }, [tasks]);


    const statuses = ["todo", "inprogress", "closed"]

    return (
        <div className="flex gap-16">
            {statuses.map((status, index) => (<Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} />))}
        </div>
    );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    let text = "Todo";
    let bg = "bg-slate-500"
    return (<div>
        <Header text={text} bg={bg} count={todos.length} />List
    </div>);
};

const Header = ({ text, bg, count }) => {
    return (<div className="">
        {text}
    </div>);
};