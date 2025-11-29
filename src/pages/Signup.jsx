import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/hooks";

function Signup() {
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });
  const { signup, isLoggedIn, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await signup(form);
      if (result.type === "auth/signup/fulfilled") {
        if (result.payload.token) {
          // If token is returned, navigate to dashboard
          setForm({ email: "", password: "", fullName: "" });
          navigate("/dashboard");
        } else {
          // If no token, redirect to login
          setForm({ email: "", password: "", fullName: "" });
          navigate("/login");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block w-1/2">
        <img
          src="https://plus.unsplash.com/premium_vector-1706709710787-05e3f59294cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="signup page visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Signup Form Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-8">
        {/* Form Container Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Create Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join HealthBridge today! Enter your details below.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.fullName}
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.email}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.password}
          />

          <Button
            text={loading ? "Signing up..." : "Sign Up"}
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          />

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
