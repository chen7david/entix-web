import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAuthTokens, setAuthTokens, clearAuthTokens } from '@/features/auth/auth.store';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import messageApi from '@/utils/message';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || 'default-client-id';

// List of auth endpoints that should not trigger token refresh
const AUTH_ENDPOINTS = [
  '/auth/signin',
  '/auth/signup',
  '/auth/confirm-signup',
  '/auth/forgot-password',
  '/auth/confirm-forgot-password',
  '/auth/refresh-token',
];

/**
 * API error response type
 */
type ApiErrorResponse = {
  status?: number;
  message?: string;
  type?: string;
};

/**
 * Checks if a URL is an auth endpoint that should not trigger token refresh
 * @param url The URL to check
 * @returns boolean indicating if it's an auth endpoint
 */
const isAuthEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

/**
 * Auth events that components can listen for
 */
export const AUTH_EVENTS = {
  TOKEN_REFRESHED: 'auth:token_refreshed',
  TOKEN_REFRESH_FAILED: 'auth:token_refresh_failed',
  SESSION_EXPIRED: 'auth:session_expired',
};

/**
 * Dispatch an auth event
 * @param eventName Event name
 * @param detail Optional event details
 */
export const dispatchAuthEvent = (eventName: string, detail: Record<string, unknown> = {}) => {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
};

/**
 * Main Axios instance for all API calls
 * Configured with request and response interceptors for auth and error handling
 */
export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Injects a token into the Authorization header
apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Obtain the fresh token each time the function is called
    const tokens = getAuthTokens();
    if (tokens?.accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Token refresh logic function for axios-auth-refresh
const refreshAuthLogic = async (failedRequest: {
  response: { config: { headers: Record<string, string> } };
}): Promise<void> => {
  try {
    const currentTokens = getAuthTokens();

    if (!currentTokens.refreshToken) {
      throw new Error('No refresh token available');
    }

    const refreshPayload = {
      refreshToken: currentTokens.refreshToken,
      clientId: CLIENT_ID,
    };

    // Create a separate axios instance for the refresh call to avoid interceptor loops
    const tokenRefreshResponse = await axios.post(
      `${API_BASE_URL}/api/v1/auth/refresh-token`,
      refreshPayload
    );

    const newAccessToken = tokenRefreshResponse.data.accessToken;
    const newRefreshToken = tokenRefreshResponse.data.refreshToken || currentTokens.refreshToken;

    if (!newAccessToken) {
      throw new Error('New access token not received after refresh');
    }

    // Update tokens in localStorage
    setAuthTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    // Update the failed request with the new token
    failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

    // Dispatch token refreshed event
    dispatchAuthEvent(AUTH_EVENTS.TOKEN_REFRESHED);

    return Promise.resolve();
  } catch (error) {
    // Clear tokens on refresh failure
    clearAuthTokens();

    // Dispatch session expired event
    dispatchAuthEvent(AUTH_EVENTS.TOKEN_REFRESH_FAILED, { error });

    // Show notification to user
    messageApi.error('Your session has expired. Please sign in again.');

    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/auth/signin';
    }, 1500);

    return Promise.reject(error);
  }
};

// Configure axios-auth-refresh with advanced options
createAuthRefreshInterceptor(apiService, refreshAuthLogic, {
  statusCodes: [401], // Only intercept 401 status codes
  pauseInstanceWhileRefreshing: true, // Prevent multiple refresh calls
  shouldRefresh: (error) => {
    // Skip refresh for auth endpoints to prevent infinite loops
    const url = error?.config?.url;
    const hasRefreshToken = Boolean(getAuthTokens().refreshToken);
    return error?.response?.status === 401 && !isAuthEndpoint(url) && hasRefreshToken;
  },
});

// Global response interceptor for error handling
apiService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Add the API's error message to the error object for easier access
    const apiErrorMessage = error.response?.data?.message || null;
    if (apiErrorMessage) {
      error.message = apiErrorMessage;
    }

    // If it's a 401/403 on an auth endpoint, dispatch session expired event
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      isAuthEndpoint(error.config?.url)
    ) {
      dispatchAuthEvent(AUTH_EVENTS.SESSION_EXPIRED);
    }

    // Global error logging
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default apiService;
