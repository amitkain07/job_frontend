import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import SingleJob from "./components/SingleJob";
import PrivateRoute from "./PrivateRoute";
import Job from "./components/Job"; 

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect "/" to dashboard if logged in */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/job" element={<Job />} />
        <Route path="/singlejob/:id" element={<SingleJob />} />
      </Route>

      {/* 404 Not Found - Redirect to Dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
