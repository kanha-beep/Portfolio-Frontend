import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // fix import

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" />;

  return <Outlet />;
}
