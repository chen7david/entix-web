import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAuthTokens, setAuthTokens, clearAuthTokens } from '@/features/auth/auth.store';

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
 * TSDoc for apiService
 * The main Axios instance for all API calls.
 * Configured with request and response interceptors for auth and error handling.
 */
export const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: AxiosError) => void }> =
  [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Injects a token into the Authorization header.
apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

// Response Interceptor: Handles token refresh on 401 errors and global error logging.
apiService.interceptors.response.use(
  (response: AxiosResponse) => response, // Simply return successful responses
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Extract API error message if available
    const apiErrorMessage = error.response?.data?.message || null;

    // Handle 401 Unauthorized for token refresh, but skip auth endpoints
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint(originalRequest.url) &&
      getAuthTokens()?.refreshToken // Only attempt if we have a refresh token
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = 'Bearer ' + token;
            }
            return apiService(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const currentTokens = getAuthTokens();

      try {
        const refreshPayload = {
          refreshToken: currentTokens.refreshToken,
          clientId: CLIENT_ID, // Ensure your refresh endpoint uses this if required
        };

        // Use a new Axios instance or direct axios.post to avoid interceptor loop for the refresh call
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh-token`,
          refreshPayload
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken; // Assuming API returns new refresh token

        if (!newAccessToken) {
          throw new Error('New access token not received after refresh');
        }

        setAuthTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken || currentTokens.refreshToken, // Persist new refresh token if provided
        });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken);
        return apiService(originalRequest);
      } catch (refreshError) {
        const typedError = refreshError as AxiosError<ApiErrorResponse>;
        console.error(
          'AuthService: Token refresh failed.',
          typedError.response?.data || typedError.message || typedError
        );
        clearAuthTokens();
        // TODO: dispatch global logout event / redirect to login page
        processQueue(typedError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Add the API's error message to the error object for easier access
    if (apiErrorMessage) {
      error.message = apiErrorMessage;
    }

    // Global error logging for other errors
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
