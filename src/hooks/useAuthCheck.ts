import { getAuthTokens } from '@/features/auth/auth.store';
import { apiService, AUTH_EVENTS } from '@/services/apiService';
import useQuery from './useQuery';
import { useEffect, useState } from 'react';

/**
 * User profile data type
 */
export type UserProfile = {
  id: string;
  role?: string;
  isAdmin?: boolean;
  [key: string]: unknown;
};

/**
 * Function to fetch user data to verify authentication status
 * @returns User data or null if not authenticated
 */
const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const tokens = getAuthTokens();
  if (!tokens.accessToken) {
    return null;
  }

  const response = await apiService.get('/api/v1/auth/me');
  return response.data;
};

/**
 * Custom hook for checking authentication status
 * Uses React Query to handle caching, revalidation, and state management
 *
 * @param {boolean} showErrorMessage - Whether to show error message toast on auth failure
 * @returns Authentication state including user data, loading state, and error state
 */
export function useAuthCheck(showErrorMessage = false) {
  const [forceRefresh, setForceRefresh] = useState(0);

  const hasToken = Boolean(getAuthTokens().accessToken);

  const query = useQuery({
    queryKey: ['auth', 'user', forceRefresh],
    queryFn: fetchUserProfile,
    retry: false, // Don't retry auth errors to prevent infinite loops
    enabled: hasToken, // Only execute query if we have a token
    staleTime: 5 * 60 * 1000, // 5 minutes - reduce unnecessary refetches
    gcTime: 10 * 60 * 1000, // 10 minutes - how long to keep data in cache
    errorMessage: 'Authentication check failed',
    showErrorMessages: showErrorMessage,
  });

  // Listen for token refresh events to refetch user data
  useEffect(() => {
    const handleTokenRefreshed = () => {
      // Force a refetch by updating the query key
      setForceRefresh((prev) => prev + 1);
    };

    // Add event listener
    window.addEventListener(AUTH_EVENTS.TOKEN_REFRESHED, handleTokenRefreshed);

    // Clean up
    return () => {
      window.removeEventListener(AUTH_EVENTS.TOKEN_REFRESHED, handleTokenRefreshed);
    };
  }, []);

  const { data: user } = query;

  return {
    ...query,
    user,
    isAuthenticated: Boolean(user),
    isAdmin: Boolean(user?.role === 'admin' || user?.isAdmin === true),
  };
}

export default useAuthCheck;
