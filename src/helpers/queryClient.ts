import { QueryClient } from '@tanstack/react-query';

/**
 * Create a configured QueryClient instance
 *
 * @param options Optional override options
 * @returns A configured QueryClient instance
 */
export function createQueryClient(options = {}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error) => {
          // Limit retries for authentication errors to prevent infinite loops
          const status = (error as { response?: { status?: number } })?.response?.status;
          if (status === 401 || status === 403) {
            return false; // Don't retry auth errors
          }
          return failureCount < 3; // Default to 3 retries for other errors
        },
        refetchOnWindowFocus: false, // Disable auto refetch on window focus - reduces unwanted API calls
      },
      mutations: {
        // Configure mutation defaults
        retry: false,
      },
      ...options,
    },
  });
}

// Export a singleton instance for direct import
export const queryClient = createQueryClient();

export default queryClient;
