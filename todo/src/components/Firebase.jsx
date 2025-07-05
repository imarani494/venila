import React, { useEffect, useState } from "react";
import axios from "axios";

function Firebase() {
  const [tasks, setTasks] = useState([]);

  const fetchData = () => {
    axios("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        const data = response.data;
        if (data) {
          const parsedTasks = Object.entries(data).map(([key, value]) => ({
            id: key,         
            ...value         
          }));
          setTasks(parsedTasks);
        } else {
          setTasks([]); 
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Firebase;
