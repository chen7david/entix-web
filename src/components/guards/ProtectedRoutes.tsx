// ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" replace state={{ from: location }} />
  );
};
