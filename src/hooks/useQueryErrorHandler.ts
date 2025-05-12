import { useEffect } from 'react';
import { useMessage } from '@/utils/message';
import type { UseQueryResult } from '@tanstack/react-query';

/**
 * Custom hook to handle React Query errors and display appropriate messages
 *
 * @param query - The query result object from useQuery
 * @param options - Options for error handling
 * @returns Nothing, handles error effects only
 */
export function useQueryErrorHandler<TData, TError>(
  query: UseQueryResult<TData, TError>,
  options: {
    /** Custom error message to show instead of the default */
    errorMessage?: string;
    /** Whether to show error messages */
    showErrorMessages?: boolean;
    /** Custom error handler */
    onError?: (error: TError) => void;
  } = {}
) {
  const {
    errorMessage = 'An error occurred while fetching data',
    showErrorMessages = true,
    onError,
  } = options;

  const message = useMessage();
  const { isError, error } = query;

  useEffect(() => {
    if (isError) {
      // Call custom error handler if provided
      if (onError) {
        onError(error as TError);
      }

      // Show error message if enabled
      if (showErrorMessages) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : typeof error === 'object' && error !== null && 'message' in error
              ? String((error as { message: unknown }).message)
              : errorMessage;

        console.error('Query error:', error);
        message.error(errorMsg);
      }
    }
  }, [isError, error, errorMessage, showErrorMessages, message, onError]);

  return null;
}

export default useQueryErrorHandler;
