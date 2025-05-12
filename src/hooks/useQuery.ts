import {
  useQuery as useReactQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import useQueryErrorHandler from './useQueryErrorHandler';

/**
 * Options for extended useQuery hook
 */
export type UseQueryOptionsWithErrorHandling<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  /** Custom error message to show on failure */
  errorMessage?: string;
  /** Whether to show error messages */
  showErrorMessages?: boolean;
  /** Custom error handler */
  onError?: (error: TError) => void;
};

/**
 * Extended useQuery hook with built-in error handling
 *
 * This hook wraps TanStack's useQuery and adds automatic error handling with Ant Design message alerts
 *
 * @param options Query options extended with error handling options
 * @returns The query result
 */
export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
>(
  options: UseQueryOptionsWithErrorHandling<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const { errorMessage, showErrorMessages = true, onError, ...queryOptions } = options;

  // Use the original React Query hook
  const query = useReactQuery<TQueryFnData, TError, TData, TQueryKey>(queryOptions);

  // Add error handling
  useQueryErrorHandler(query, {
    errorMessage,
    showErrorMessages,
    onError,
  });

  return query;
}

export default useQuery;
