import { Navigate, Outlet, useLocation } from "react-router-dom";

type AuthGuardProps = {
  isAuthenticated: boolean;
};

export const AuthGuard = ({ isAuthenticated }: AuthGuardProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Encode the full path to handle special characters
    const redirectPath = encodeURIComponent(
      location.pathname + location.search
    );
    return (
      <Navigate
        to={`/auth/login?redirect=${redirectPath}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};
