import React from "react";
import { useAuth } from "../context/Context";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
