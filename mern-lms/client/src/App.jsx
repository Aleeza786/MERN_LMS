import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./state/AuthContext.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 16 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute roles={["instructor", "admin"]}>
            <CreateCourse />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
