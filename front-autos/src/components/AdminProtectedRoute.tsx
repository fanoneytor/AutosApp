import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Role } from "../types/auth";

export default function AdminProtectedRoute() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== Role.ADMIN) {
    return <Navigate to="/cars" replace />;
  }

  return <Outlet />;
}
