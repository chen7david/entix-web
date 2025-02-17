import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "@/services/auth.service";

export function AuthGuard() {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    // Preserve the attempted URL for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
