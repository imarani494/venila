import React, { useState } from "react";

const TodoBase = () => {
  const [task, setTask] = useState(["Buy milk", "Study React"]);
  const [clear, setClear] = useState("");

  const handleAdd = () => {
    const trimAdd = clear.trim();
    if (trimAdd) {
      setTask([...task, trimAdd]);
      setClear("");
    }
  };

  const handleClear = () => {
    setTask([]);
  };
  return (
    <div>
      <h1>hello imran</h1>

      <input
        type="text"
        value={clear}
        placeholder="enter your name"
        onChange={(e) => setClear(e.target.value)}
      />

      <button onClick={handleAdd}>Add task</button>
      <button onClick={handleClear}>clear task</button>

      <ul>
        {task.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          task.map((task, index) => <li key={index}>{task}</li>)
        )}
      </ul>
    </div>
  );
};

export default TodoBase;
