import React, { useEffect, useState } from "react";
import axios from "axios";

const firebaseUrl = "https://your-firebase-db.firebaseio.com/users";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UserMana() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({ name: "", email: "" });

 
  const fetchUsers = () => {
    axios
      .get(`${firebaseUrl}.json`)
      .then((res) => {
        const data = res.data || {};
        const usersArray = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(usersArray);
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 
  const validate = () => {
    const newErrors = { name: "", email: "" };
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email.";
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editId) {
     
      axios
        .patch(`${firebaseUrl}/${editId}.json`, form)
        .then(() => {
          fetchUsers();
          setForm({ name: "", email: "" });
          setEditId(null);
        })
        .catch((err) => console.error("Update Error:", err));
    } else {
     
      axios
        .post(`${firebaseUrl}.json`, form)
        .then(() => {
          fetchUsers();
          setForm({ name: "", email: "" });
        })
        .catch((err) => console.error("Add Error:", err));
    }
  };

 
  const handleDelete = (id) => {
    axios
      .delete(`${firebaseUrl}/${id}.json`)
      .then(() => fetchUsers())
      .catch((err) => console.error("Delete Error:", err));
  };

 
  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email });
    setErrors({ name: "", email: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        <br />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        <br />

        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong> - {user.email}{" "}
            <button onClick={() => handleEdit(user)}>Edit</button>{" "}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserMana;
