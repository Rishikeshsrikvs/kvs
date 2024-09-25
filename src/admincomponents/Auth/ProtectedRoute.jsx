import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Assuming `isAuthenticated` is provided by AuthContext

  if (!isAuthenticated) {
    // Redirect to the new login route if not authenticated
    return <Navigate to="/admin/SHRA/login" />;
  }

  return children;
};

export default ProtectedRoute;
