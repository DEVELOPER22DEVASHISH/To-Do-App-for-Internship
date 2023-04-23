import React, { useEffect } from "react";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import  toast  from "react-hot-toast";


import axios from 'axios';

const ListTasks = ({ tasks, setTasks }) => {

    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {

        const fTodos = tasks.filter((task) => task.status === "todo");
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

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        }),
      }));

    //   console.log(isOver)

    let text = "Todo";
    let bg = "bg-slate-500";
    let taskToMap = todos;

    if (status === "inprogress") {
        text = "In Progress"
        bg = "bg-purple-500"
        taskToMap = inProgress;
    }

    if (status === "closed") {
        text = "Closed"
        bg = "bg-green-500"
        taskToMap = closed;
        
    }


    const addItemToSection = (id) => {
        setTasks(prev =>{
            const mTasks = prev.map(t => {
                if(t.id===id){
                    return {...t, status: status};
                }
                return t;
            });

            localStorage.setItem("tasks", JSON.stringify(mTasks))
            toast("Task status changed", {icon: ""})

            return mTasks;
        });
    }
    return (<div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200"  : ""}`}>
        <Header text={text} bg={bg} count={taskToMap.length} />
        {taskToMap.length > 0 && taskToMap.map((task) => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
    </div>);
};

const Header = ({ text, bg, count }) => {
    return (<div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
        {text} <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">{count}</div>
    </div>);
};
const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        }),
      }));

      console.log(isDragging)

    const handleRemove = async (id) => {

        try {
            const {data} = await axios.delete(`/api/v1/todos/create-todos/delete-todos/:id/${id}`,{
                text:tasks.text

            });

            if (data?.success) {
                console.log("todoss deleted")
                window.location.reload();
            }

        } catch (error) {
            console.log(error)
            
        }

        console.log(id);

        const fTasks = tasks.filter(t => t.id !==id)
         localStorage.setItem("tasks", JSON.stringify(fTasks))

        setTasks(fTasks);

        toast("Task removed", {icon: ""})
    }
    return (<div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
        <p>{task.name}</p>

        <button className="absolute bottom-1 right-1 text-slate-400" onClick={() => handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        </button>
    </div>);
};
