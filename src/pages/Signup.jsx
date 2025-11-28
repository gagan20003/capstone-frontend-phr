import React, { useState } from "react";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { signup } from "../api/apiService";

function Signup() {
  const [form, setForm] = useState({ email: "", fullName: "", password: "" });

  //   const { login } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    // e.preventDefault();

    try {
      console.log(form, "formdata");
      //   await signup(form);
      //   setForm({email: "", password: "", fullName: ""})
      //   Navigate("/login");
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
            text="Sign Up"
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
