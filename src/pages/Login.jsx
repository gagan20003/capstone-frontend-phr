import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/hooks";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/helper";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const { login, isLoggedIn, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    // e.preventDefault();

    if (form.email.trim() === "" || form.password.trim() === "") {
      setErrors("Email or password cannot be empty!!!");
      return;
    }

    if (!validateEmail(form.email)) {
      setErrors("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      setErrors(
        "Password must have at least 8 characters, one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      setErrors("");
      const result = await login(form);
      if (result.type === "auth/login/fulfilled") {
        setForm({ email: "", password: "" });
        toast.success("Welcome! Logged in successfully");
        navigate("/");
      } else {
        setErrors("Invalid Credentials");
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
          alt="login page visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Login Form Section (Takes full width on small screens, half on md+) */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-8">
        {/* Form Container Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Login
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Welcome back! Please enter your credentials to log in.
          </p>

          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors}
            </div>
          )}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.email}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={form.password}
          />

          <Button
            text={loading ? "Logging in..." : "Login"}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleLogin}
            disabled={loading}
          />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
