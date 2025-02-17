import { Navigate, Outlet } from "react-router-dom";
import { authService } from "@/services/auth.service";

export function AdminGuard() {
  if (!authService.isAdmin()) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
