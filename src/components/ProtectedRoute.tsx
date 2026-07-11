import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "user";
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  // const { isAuthenticated, isLoading, user } = useAuth();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  // if(requiredRole === 'admin' && user?.role !== 'admin') {
  //   return <Navigate to="/admin/products" replace />;
  // }

  // if (requiredRole && user?.role !== requiredRole) {
  //   return <Navigate to="/unauthorized" replace />; // or "/"
  // }

  return <Outlet />;
};

export default ProtectedRoute;
