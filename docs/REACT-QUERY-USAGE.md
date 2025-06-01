# React Query Setup and Usage Guidelines

## Overview

This project uses TanStack Query (React Query) for data fetching, caching, and server state management. We've implemented a set of custom hooks and utilities to make using React Query more consistent and to avoid common pitfalls like infinite loops.

## Key Components

### 1. QueryClient Configuration

The QueryClient is configured in `src/helpers/queryClient.ts` with sensible defaults:

- **staleTime**: 60 seconds (1 minute) - Data is considered fresh for this period
- **gcTime**: 10 minutes - Inactive queries stay in cache for this period
- **retry**: Custom logic that prevents retrying 401/403 authentication errors
- **refetchOnWindowFocus**: Disabled to prevent unnecessary API calls

```typescript
// Import the pre-configured QueryClient
import queryClient from './helpers/queryClient';
```

### 2. Custom Hooks

#### `useQuery`

Our extended `useQuery` hook in `src/hooks/useQuery.ts` wraps TanStack's useQuery with built-in error handling:

```typescript
import useQuery from '@/hooks/useQuery';

// Basic usage
const { data, isLoading, isError } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  // Error handling options
  errorMessage: 'Failed to fetch todos',
  showErrorMessages: true,
  // All standard React Query options are also supported
  staleTime: 5 * 60 * 1000,
});
```

#### `useAuthCheck`

A specialized hook for authentication checks in `src/hooks/useAuthCheck.ts`:

```typescript
import useAuthCheck from '@/hooks/useAuthCheck';

// In a component
const { isAuthenticated, isAdmin, user, isLoading } = useAuthCheck();

// The hook handles error messages automatically
```

#### `useQueryErrorHandler`

Used internally, but can also be used directly with any React Query result:

```typescript
import { useQuery } from '@tanstack/react-query';
import useQueryErrorHandler from '@/hooks/useQueryErrorHandler';

const query = useQuery({...});

// Handle errors separately
useQueryErrorHandler(query, {
  errorMessage: 'Custom error message',
  showErrorMessages: true,
  onError: (error) => {
    // Custom error handling
  }
});
```

## Authentication Flow

### Protected Routes

The `ProtectedRoute` component in `src/components/auth/ProtectedRoute.tsx` uses `useAuthCheck` to verify authentication before rendering protected content:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

// For admin-only routes:
<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

## Best Practices

1. **Avoid Infinite Loops**: Never use callbacks like onSuccess/onError directly in useQuery. Use our custom hooks instead, or handle query states with useEffect.

2. **Centralize API Logic**: Define reusable query hooks for each API endpoint in dedicated files.

3. **Type Safety**: Always properly type your query functions and return types.

4. **Query Keys**: Use structured, consistent query keys for better cache management.

5. **Avoid Waterfalls**: When possible, use parallel queries or prefetching to prevent request waterfalls.

6. **Stale Time vs GC Time**:
   - `staleTime` determines when data needs refreshing
   - `gcTime` determines how long unused data stays in cache

## Debugging

React Query DevTools are automatically included in development mode. Toggle the floating button in the bottom-right corner to open the DevTools panel.

## Common Issues

### "Your session has expired" Loop

If you encounter an infinite loop with the message "Your session has expired. Please sign in again", check:

1. Ensure you're using our custom hooks which have built-in loop prevention
2. Verify that token refresh logic in `apiService.ts` is working correctly
3. Check that `retry: false` is set for authentication queries

### Background Refetching Issues

If you're seeing too many or too few refetches:

1. Adjust the `staleTime` for your specific query
2. Set `refetchOnWindowFocus: false` for queries that shouldn't refetch on focus
3. Use `refetchInterval` for polling data that needs regular updates

## Further Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TkDodo's Blog](https://tkdodo.eu/blog/practical-react-query) - Excellent articles on React Query best practices
