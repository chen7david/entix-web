import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { getAuthTokens } from '@/features/auth/auth.store';
import { apiService } from '@/services/apiService';
import { useMessage } from '@/utils/message';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();
  const message = useMessage();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const tokens = getAuthTokens();

      // Quick check if tokens exist
      if (!tokens.accessToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token validity by checking user data
        const response = await apiService.get('/api/v1/users/me');
        setIsAuthenticated(true);

        // Check if user has admin role (adjust based on your API response)
        setIsAdmin(response.data.role === 'admin' || response.data.isAdmin === true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        message.error('Your session has expired. Please sign in again.');
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [message]);

  // Show loading while checking authentication status
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
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
