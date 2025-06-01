# Implementing Token Refresh with axios-auth-refresh

## Problem We Solved

The application was experiencing an infinite loop with the message "Your session has expired. Please sign in again." This happened because:

1. The custom token refresh logic was not properly handling refresh status
2. Multiple refresh requests were being made simultaneously
3. Error handling wasn't properly coordinated with React Query
4. Token refresh failures were causing cascading errors

## Solution: axios-auth-refresh

We've implemented [axios-auth-refresh](https://www.npmjs.com/package/axios-auth-refresh), a library specifically designed for handling token refresh in a clean and efficient way. This library:

1. Automatically intercepts 401 errors
2. Manages a queue of failed requests to retry after token refresh
3. Prevents multiple refresh requests from happening simultaneously
4. Avoids infinite loops by properly handling refresh failures

## Implementation Details

### 1. API Service Updates

The `apiService.ts` file now uses axios-auth-refresh with these key configurations:

```typescript
// Token refresh logic function
const refreshAuthLogic = async (failedRequest) => {
  try {
    // Token refresh logic here
    // ...

    // Update the failed request with the new token
    failedRequest.response.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

    // Dispatch event to notify other components
    dispatchAuthEvent(AUTH_EVENTS.TOKEN_REFRESHED);

    return Promise.resolve();
  } catch (error) {
    // Handle refresh failure
    // ...
    return Promise.reject(error);
  }
};

// Configure axios-auth-refresh
createAuthRefreshInterceptor(apiService, refreshAuthLogic, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true, // Prevent multiple refresh calls
  shouldRefresh: (error) => {
    // Custom logic to determine when to refresh
    // Skip refresh for auth endpoints to prevent infinite loops
    const url = error?.config?.url;
    const hasRefreshToken = Boolean(getAuthTokens().refreshToken);
    return error?.response?.status === 401 && !isAuthEndpoint(url) && hasRefreshToken;
  },
});
```

### 2. Event-Based Architecture

We introduced an event-based system for handling authentication events:

```typescript
export const AUTH_EVENTS = {
  TOKEN_REFRESHED: 'auth:token_refreshed',
  TOKEN_REFRESH_FAILED: 'auth:token_refresh_failed',
  SESSION_EXPIRED: 'auth:session_expired',
};

export const dispatchAuthEvent = (eventName, detail = {}) => {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
};
```

### 3. Enhanced useAuthCheck Hook

The `useAuthCheck` hook was updated to:

1. Listen for token refresh events
2. Force query refetch when tokens are refreshed
3. Avoid showing error messages by default
4. Use a more specific error message

```typescript
export function useAuthCheck(showErrorMessage = false) {
  const [forceRefresh, setForceRefresh] = useState(0);

  // Listen for token refresh events
  useEffect(() => {
    const handleTokenRefreshed = () => {
      setForceRefresh((prev) => prev + 1);
    };

    window.addEventListener(AUTH_EVENTS.TOKEN_REFRESHED, handleTokenRefreshed);

    return () => {
      window.removeEventListener(AUTH_EVENTS.TOKEN_REFRESHED, handleTokenRefreshed);
    };
  }, []);

  // Rest of the hook implementation...
}
```

### 4. ProtectedRoute Component Updates

The `ProtectedRoute` component now:

1. Listens for auth events
2. Handles navigation based on these events
3. Uses the updated useAuthCheck hook

## How This Prevents Infinite Loops

1. **Single Refresh Request**: `pauseInstanceWhileRefreshing: true` ensures only one refresh request runs at a time
2. **Request Queuing**: Failed requests are queued and retried only after successful token refresh
3. **Selective Refresh**: `shouldRefresh` callback prevents refresh attempts for auth endpoints
4. **Proper Error Handling**: Refresh failures are properly handled with session termination and user feedback
5. **Event-Based Updates**: Components react to auth events rather than causing cascading requests

## Testing Your Implementation

To verify the implementation works correctly:

1. Sign in to the application
2. Wait for your token to expire (or modify a request to use an expired token)
3. Make an API request that requires authentication
4. Verify that:
   - The token refreshes automatically
   - The original request succeeds
   - No infinite loop occurs
   - If refresh fails, user is redirected to login page

## Potential Issues to Watch For

1. **Network Connectivity**: If the refresh token request fails due to network issues, the user will be logged out
2. **Server-Side Validation**: Ensure your server properly validates refresh tokens and returns appropriate status codes
3. **CORS Issues**: Some servers may not return proper CORS headers for 401 responses, which can be addressed with the `interceptNetworkError` option if needed

## Further Improvements

Consider these additional enhancements:

1. Implement a global auth state manager (like an Auth Context)
2. Add silent refresh before token expiration
3. Add more sophisticated token expiration prediction
4. Implement offline mode handling for token refresh
