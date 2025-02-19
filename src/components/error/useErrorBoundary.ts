import { useCallback, useState } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    throw error;
  }

  const throwError = useCallback((error: Error) => {
    setError(error);
  }, []);

  return { throwError };
}
