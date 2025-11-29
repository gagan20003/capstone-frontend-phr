import { useState } from "react";
import "./App.css";
import Hero from "./pages/Hero";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/records" element={<MedicalRecords />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
