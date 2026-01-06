import React from "react";
import { useAuth } from "../context/Context";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/profile" />;
  return children;
};

export default PublicRoute;
