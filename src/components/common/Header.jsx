import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/hooks";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleSignupButtonClick = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4  shadow-md top-0 sticky bg-white backdrop-blur-xl">
      {/* Logo */}
      <a className="text-2xl font-bold text-blue-600">HealthBridge</a>

      {/* Navigation */}
      {isLoggedIn && (
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a>Profile</a>
          <a>Records</a>
          <a>Appointments</a>
        </nav>
      )}

      {/* Login/Register Buttons or Logout */}
      <div className="flex gap-3">
        {isLoggedIn ? (
          <Button
            text="Logout"
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition"
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
