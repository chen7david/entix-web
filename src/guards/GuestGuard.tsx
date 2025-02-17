import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";

export function GuestGuard() {
  if (authService.isAuthenticated()) {
    return (
      <Navigate
        to={authService.isAdmin() ? "/dashboard" : "/profile"}
        replace
      />
    );
  }

  return <Outlet />;
}
