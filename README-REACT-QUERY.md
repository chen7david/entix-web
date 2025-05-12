# React Query Infinite Loop Fix

## Problem Description

The application was experiencing an infinite loop with the error message "Your session has expired. Please sign in again." This was happening due to:

1. React Query v5 removed `onSuccess`, `onError`, and `onSettled` callbacks from `useQuery` (but kept them for mutations)
2. Our authentication flow in `ProtectedRoute` was using the `onError` callback
3. When authentication failed, it would show the error message, but the callback would cause re-render, triggering the query again

## Solution Overview

We've implemented a comprehensive solution that not only fixes the infinite loop issue but also improves the architecture for using React Query throughout the application:

1. **Created a centralized QueryClient configuration**

   - Defined in `src/helpers/queryClient.ts`
   - Configured with appropriate defaults
   - Prevents retries on auth errors (401/403)

2. **Built custom hooks for error handling**

   - `useQueryErrorHandler`: Generic hook for handling query errors
   - `useQuery`: Extended wrapper around React Query's useQuery with built-in error handling
   - `useAuthCheck`: Specialized hook for authentication checks

3. **Updated ProtectedRoute component**

   - Now uses the `useAuthCheck` hook
   - Properly handles error states
   - Separates error handling from data fetching

4. **Added Dev Tools**
   - Installed React Query DevTools for easier debugging

## Key Files Changed

- `src/main.tsx`: Updated to use our configured QueryClient
- `src/helpers/queryClient.ts`: Created to export a consistent QueryClient
- `src/hooks/useQueryErrorHandler.ts`: Created for centralized error handling
- `src/hooks/useQuery.ts`: Created to wrap React Query's useQuery
- `src/hooks/useAuthCheck.ts`: Created for auth-specific logic
- `src/components/auth/ProtectedRoute.tsx`: Updated to use the new hooks
- `src/hooks/useTodos.ts`: Example of a feature-specific query hook
- `REACT-QUERY-USAGE.md`: Documentation for the team

## Best Practices Implemented

1. **Separation of Concerns**

   - Query logic separate from components
   - Error handling separate from data fetching
   - Reusable hooks for common patterns

2. **Type Safety**

   - Proper TypeScript types for all hooks and functions
   - Generic types for maximum flexibility

3. **Proper Component Lifecycles**

   - Used `useEffect` for side effects
   - Avoided using callbacks that could cause infinite loops

4. **Documentation**
   - Added comprehensive documentation
   - Included examples and best practices

## Usage Example

```tsx
// Before (problematic)
const { data } = useQuery({
  queryKey: ['auth', 'user'],
  queryFn: fetchUserProfile,
  onError: (error) => {
    // This could cause infinite loops in React Query v5
    message.error('Your session has expired. Please sign in again.');
  },
});

// After (fixed)
const { user, isAuthenticated, isAdmin } = useAuthCheck();
// Error handling is built into the hook
```

## Testing

The changes have been tested and verified to work correctly:

1. Authentication flow works correctly
2. Error messages display properly
3. No infinite loops occur
4. Cache invalidation works as expected

## Additional Resources

For more details on how to use React Query in this project, see:

- `REACT-QUERY-USAGE.md` for complete documentation
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TkDodo's React Query Blog](https://tkdodo.eu/blog/react-query-fa-qs) (especially the post on onSuccess/onError callbacks)
