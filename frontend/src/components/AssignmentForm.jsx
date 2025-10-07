import { useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

const AssignmentForm = ({ onCreated }) => {
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const { user } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/assignments", form, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setForm({ title: "", description: "", dueDate: "" });
    onCreated();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Create New Assignment</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter assignment title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;
