import { useState } from "react";
import "./App.css";
import Hero from "./pages/Hero";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import UserProfile from "./pages/UserProfile";
import { useAuth } from "./store/hooks";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Hero />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/appointments"
        element={isLoggedIn ? <Appointments /> : <Navigate to="/" />}
      />
      <Route
        path="/records"
        element={isLoggedIn ? <MedicalRecords /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
