import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleSignupButtonClick = () => {
    navigate("/signup");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4  shadow-md top-0 sticky bg-white backdrop-blur-xl">
      {/* Logo */}
      <a className="text-2xl font-bold text-blue-600">HealthBridge</a>

      {/* Navigation */}
      <nav className="flex gap-6 text-gray-700 font-medium">
        <a>Profile</a>
        <a>Records</a>
        <a>Appointments</a>
      </nav>

      {/* Login/Register Buttons */}
      <div className="flex gap-3">
        <Button
          text="Login"
          onClick={handleLoginButtonClick}
          className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition"
        />
        <Button
          text="Register"
          onClick={handleSignupButtonClick}
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition"
        />
      </div>
    </header>
  );
}

export default Header;
