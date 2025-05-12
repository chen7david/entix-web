import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useMessage } from '@/utils/message';
import useAuthCheck from '@/hooks/useAuthCheck';
import { AUTH_EVENTS } from '@/services/apiService';

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

/**
 * ProtectedRoute component to handle authentication checks for protected routes
 * Routes wrapped with this component will redirect to login if user is not authenticated
 *
 * @param {React.ReactNode} children - The child components to render if authenticated
 * @param {boolean} adminOnly - Whether the route is restricted to admin users only
 * @returns {JSX.Element} The protected route component
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = useMessage();

  // Use our custom hook to check authentication
  const { isAuthenticated, isAdmin, isLoading, isError } = useAuthCheck();

  // Listen for auth events from apiService
  useEffect(() => {
    const handleSessionExpired = () => {
      navigate('/auth/signin', { state: { from: location }, replace: true });
    };

    const handleTokenRefreshFailed = () => {
      // This will be handled by the apiService directly with redirect
    };

    // Add event listeners
    window.addEventListener(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
    window.addEventListener(AUTH_EVENTS.TOKEN_REFRESH_FAILED, handleTokenRefreshFailed);

    // Clean up
    return () => {
      window.removeEventListener(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
      window.removeEventListener(AUTH_EVENTS.TOKEN_REFRESH_FAILED, handleTokenRefreshFailed);
    };
  }, [location, navigate]);

  // Show loading while checking authentication status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  // Not authenticated or error - redirect to login
  if (!isAuthenticated || isError) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Check admin access if required
  if (adminOnly && !isAdmin) {
    message.error('You do not have permission to access this page');
    return <Navigate to="/unauthorized" replace />;
  }

  // Authenticated (and admin if required) - render children
  return <>{children}</>;
};

export default ProtectedRoute;
