import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(data.role === "teacher" ? "/teacher" : "/student");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.center}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  center: {
    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f0f0"
  },
  form: {
    background: "#fff", padding: 20, borderRadius: 8, width: 300, boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  title: { textAlign: "center", marginBottom: 20 },
  input: { width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #ccc" },
  button: { width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4 },
};

export default Login;
