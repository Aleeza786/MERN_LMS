import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, borderBottom: "1px solid #ddd", paddingBottom: 12 }}>
      <Link to="/courses"><strong>MERN LMS</strong></Link>
      <Link to="/courses">Courses</Link>
      {user && <Link to="/dashboard">Dashboard</Link>}
      {user && (user.role === "instructor" || user.role === "admin") && <Link to="/create">Create Course</Link>}
      <div style={{ marginLeft: "auto" }} />
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span>Hi, {user.name} ({user.role})</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
