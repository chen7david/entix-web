import { apiService } from '@/services/apiService';
import useQuery from './useQuery';

/**
 * Todo item type
 */
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

/**
 * Options for fetching todos
 */
export type TodoOptions = {
  userId?: number;
  completed?: boolean;
  limit?: number;
};

/**
 * Fetch todos from the API
 *
 * @param options Optional filtering options
 * @returns Promise resolving to an array of todos
 */
export const fetchTodos = async (options: TodoOptions = {}): Promise<Todo[]> => {
  const { userId, completed, limit } = options;

  // Build query parameters
  const params = new URLSearchParams();
  if (userId !== undefined) params.append('userId', userId.toString());
  if (completed !== undefined) params.append('completed', completed.toString());
  if (limit !== undefined) params.append('_limit', limit.toString());

  const queryString = params.toString();
  const url = `/todos${queryString ? `?${queryString}` : ''}`;

  const response = await apiService.get(url);
  return response.data;
};

/**
 * Custom hook for fetching todos with React Query
 *
 * @param options Todo filtering options and React Query options
 * @returns Query result with todos data
 */
export function useTodos(
  options: TodoOptions & {
    enabled?: boolean;
    staleTime?: number;
  } = {}
) {
  const { userId, completed, limit, ...queryOptions } = options;

  return useQuery({
    queryKey: ['todos', { userId, completed, limit }],
    queryFn: () => fetchTodos({ userId, completed, limit }),
    errorMessage: 'Failed to load todos',
    // Default query options can be overridden
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  });
}

export default useTodos;
