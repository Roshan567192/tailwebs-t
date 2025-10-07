import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
