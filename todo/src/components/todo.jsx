import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState([]); // Fixed: initialize with []
  const [input, setInput] = useState(""); // Fixed: initialize with empty string

  const handleAdd = () => {
    const trimAdd = input.trim();
    if (trimAdd) {
      setTask([...task, { id: Date.now(), text: trimAdd, completed: false }]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setTask(task.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {task.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
