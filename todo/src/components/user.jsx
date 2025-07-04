import React, { useState, useMemo } from "react";
import '../styles/TaskManager.css'
const priorityOrder = {
  High: 3,
  Medium: 2,
  Low: 1
};

function User() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleAddTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      const newTask = {
        id: Date.now(),
        title: trimmedTitle,
        priority,
        completed: false
      };
      setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
      setTitle("");
      setPriority("Medium");
    }
  };

  const sortTasks = (taskList) => {
    return [...taskList].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  };

  const toggleCompletion = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks(updated));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const priorityMatch =
        filterPriority === "All" || task.priority === filterPriority;
      const statusMatch =
        filterStatus === "All" ||
        (filterStatus === "Completed" && task.completed) ||
        (filterStatus === "Incomplete" && !task.completed);
      return priorityMatch && statusMatch;
    });
  }, [tasks, filterPriority, filterStatus]);

  return (
    <div className="container">
      <h2>📝 Advanced Task Manager</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="filter-section">
        <label>
          Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Status:
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </label>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <li>No tasks found.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${
                task.priority === "High" ? "high-priority" : ""
              }`}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none"
                  }}
                >
                  {task.title} ({task.priority})
                </span>
              </div>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default User;
