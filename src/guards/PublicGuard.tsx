import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { AdminRoutes } from "@/constants/routes.constants";

type PublicGuardProps = {
  isAuthenticated: boolean;
};

export const PublicGuard = ({ isAuthenticated }: PublicGuardProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (isAuthenticated) {
    // Check URL parameter first, then state, then fallback to dashboard
    const redirectPath = searchParams.get("redirect");
    const redirectTo = redirectPath
      ? decodeURIComponent(redirectPath)
      : location.state?.from?.pathname || AdminRoutes.DASHBOARD;

    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
