import React, { useState } from "react";

import '../App.css'
const UserAdd = () => {
  const [filter, setFilter] = useState("All");
  const [student, setStudent] = useState([
    { id: 1, name: "imran", present: true },
    { id: 2, name: "dev", present: true },
    { id: 3, name: "imo", present: true },
    { id: 4, name: "aish", present: true },
    { id: 5, name: "said", present: true },
  ]);

  const toggleAtt = (id) => {
    const updated = student.map((s) =>
      s.id === id ? { ...s, present: !s.present } : s
    );
    setStudent(updated);
  };

  const filteredStudents = student.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Present") return s.present;
    if (filter === "Absent") return !s.present;
    return true;
  });

  const total = student.filter((s) => s.present).length;

  return (
    <>
      <div style={styles.container}>
        <h1>User Manager</h1>

        <label>
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>

        <p style={{ fontWeight: "bold" }}>Total Present: {total}</p>
      </div>

      <div>
        <ul style={styles.list}>
          {filteredStudents.length === 0 ? (
            <li>No students found.</li>
          ) : (
            filteredStudents.map((s) => (
              <li
                key={s.id}
                style={{
                  ...styles.listItem,
                  backgroundColor: s.present ? "#d4edda" : "#f8d7da",
                  color: s.present ? "#155724" : "#721c24",
                }}
              >
                <span>
                  {s.name} - {s.present ? "Present" : "Absent"}
                </span>
                <button
                  style={styles.toggleButton}
                  onClick={() => toggleAtt(s.id)}
                >
                  Toggle
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 500,
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  select: {
    marginLeft: 10,
    padding: 5,
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: 500,
    margin: "auto",
  },
  listItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleButton: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default UserAdd;
