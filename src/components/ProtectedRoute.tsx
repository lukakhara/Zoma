import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // If this is a "user" route but the logged-in user is actually an admin, send them to admin
  if (requiredRole === "user" && user?.role === "admin") {
    return <Navigate to="/admin/products" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;