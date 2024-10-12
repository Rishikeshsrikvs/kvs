import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // API instance with base URL set
import { useAuth } from "./Auth/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import logo from "./../assets/images/logo.png";
import "./Adminlogin.css";

export const Adminlogin = () => {
  const { login } = useAuth(); // Using AuthContext to manage authentication state
  const navigate = useNavigate(); // For navigation after successful login
  const [username, setUsername] = useState(""); // Default admin username
  const [password, setPassword] = useState(""); // Default admin password
  const [loading, setLoading] = useState(false); // Loading state to disable form while submitting
  const [error, setError] = useState(""); // Error state for displaying error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state on form submission

    try {
      const response = await api.post("/api/admin/adminlogin", {
        adminEmail: username,
        adminPassword: password,
      });

      const { status, data } = response;

      if (status === 200 && data.token) {
        login(data.token);
        console.log(data.token);
         // Store JWT token in AuthContext
        navigate("/admin/SHRA/dashboard"); // Navigate to dashboard after successful login
      } else {
        setError("Invalid credentials"); // Set error message for invalid credentials
      }
    } catch (error) {
      setError("Error connecting to server"); // Set error message for server connection issues
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="adminloginmaincon">
      <div className="adminlogincon">
        <img src={logo} alt="logo" />
        <div className="title">
          <h1>Welcome Commander!</h1>
          <h5>Please Login To Your Account</h5>
        </div>
        <form className="formcon" onSubmit={handleSubmit}>
          <div className="inputcon">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              name="uname"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="inputcon">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Disable input while loading
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye icons */}
              </span>
            </div>
          </div>
          <input
            className="formsubmit"
            type="submit"
            value="Sign In"
            disabled={loading} // Disable submit button while loading
          />
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Adminlogin;
