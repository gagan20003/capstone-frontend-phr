import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/hooks";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, userDetails } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleSignupButtonClick = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md top-0 sticky bg-white backdrop-blur-xl z-50">
      {/* Logo */}
      <Link to={"/"} className="text-2xl font-bold text-blue-600">
        HealthBridge
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        {isLoggedIn && (
          <nav className="flex gap-6 text-gray-700 font-medium">
            <Link
              to={"/profile"}
              className={`hover:text-blue-600 transition-colors ${location.pathname === "/profile" ? "text-blue-600" : ""
                }`}
            >
              Profile
            </Link>
            <Link
              to={"/records"}
              className={`hover:text-blue-600 transition-colors ${location.pathname === "/records" ? "text-blue-600" : ""
                }`}
            >
              Records
            </Link>
            <Link
              to={"/appointments"}
              className={`hover:text-blue-600 transition-colors ${location.pathname === "/appointments" ? "text-blue-600" : ""
                }`}
            >
              Appointments
            </Link>
          </nav>
        )}
      </div>

      {/* Login/Register Buttons or Logout & Mobile Menu */}
      <div className="flex gap-3 items-center">
        {isLoggedIn ? (
          <>
            {userDetails && <p className="hidden md:block">{userDetails.Email}</p>}
            <Button
              text="Logout"
              onClick={handleLogout}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition hidden md:block"
            />
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
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

      {/* Mobile Menu Overlay */}
      {isLoggedIn && isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col p-4 gap-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link
              to={"/profile"}
              onClick={() => setIsMenuOpen(false)}
              className={`p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${location.pathname === "/profile"
                ? "bg-blue-50 text-blue-600"
                : ""
                }`}
            >
              Profile
            </Link>
            <Link
              to={"/records"}
              onClick={() => setIsMenuOpen(false)}
              className={`p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${location.pathname === "/records"
                ? "bg-blue-50 text-blue-600"
                : ""
                }`}
            >
              Records
            </Link>
            <Link
              to={"/appointments"}
              onClick={() => setIsMenuOpen(false)}
              className={`p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors ${location.pathname === "/appointments"
                ? "bg-blue-50 text-blue-600"
                : ""
                }`}
            >
              Appointments
            </Link>
          </nav>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            {userDetails && <p className="text-sm text-gray-500">Signed in as: {userDetails.Email}</p>}
            <Button
              text="Logout"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition w-full"
            />
          </div>
        </div>
      )}
    </header>
  );

}

export default Header;
