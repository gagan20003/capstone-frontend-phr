import React, { useState } from "react";

const Button = ({ text, onClick, type = "button", className = "", disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onClick(); // Call the passed function
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "6px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : null}
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
