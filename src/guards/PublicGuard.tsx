import { Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";

type PublicGuardProps = {
  isAuthenticated: boolean;
};

export const PublicGuard = ({ isAuthenticated }: PublicGuardProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  if (isAuthenticated) {
    // Check URL parameter first, then state, then fallback to dashboard
    const redirectPath = searchParams.get('redirect');
    const redirectTo = redirectPath 
      ? decodeURIComponent(redirectPath)
      : location.state?.from?.pathname || "/admin/dashboard";
      
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
