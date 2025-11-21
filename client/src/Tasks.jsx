import React, { useState, useEffect } from "react";
import axios from "../services/api";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get("/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        const res = await axios.post("/tasks", { title });
        setTasks([...tasks, res.data]);
        setTitle("");
    };

    const toggleComplete = async (id, completed) => {
        await axios.put(`/tasks/${id}`, { completed: !completed });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Task Manager</h1>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-1 mr-2"
            />
            <button onClick={addTask} className="bg-blue-500 text-white px-2">Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(task._id, task.completed)}
                        />
                        {task.title}
                        <button onClick={() => deleteTask(task._id)} className="ml-2 text-red-500">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
