import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Job from "./components/Job";
import SingleJob from "./components/SingleJob";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/job" element={<PrivateRoute element={<Job />} />} />
        <Route path="/singlejob/:id" element={<PrivateRoute element={<SingleJob />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
