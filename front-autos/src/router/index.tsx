import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CarsPage from "../pages/CarsPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import { useAuth } from "../context/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeRedirect />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "cars", element: <CarsPage /> },
        ],
      },
      {
        element: <AdminProtectedRoute />,
        children: [
          { path: "admin/users", element: <AdminUsersPage /> },
        ],
      },
    ],
  },
]);

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/cars" replace /> : <Navigate to="/login" replace />;
}
