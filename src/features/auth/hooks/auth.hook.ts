import { authService } from "@/features/auth/services/auth.service";
import { authAtom, loadUserAtom } from "@/features/auth/store/auth.store";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import type {
  AuthError,
  SignUpCredentials,
} from "@/features/auth/services/auth.service";

type AuthResult<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

/**
 * Custom hook for managing authentication state and operations
 */
export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const loadUser = useSetAtom(loadUserAtom);

  const handleAuthError = useCallback(
    (error: unknown): string => {
      const authError = error as AuthError;
      setAuth((prev) => ({
        ...prev,
        error: authError.message,
        authError,
        isLoading: false,
      }));
      return authError.message;
    },
    [setAuth]
  );

  const register = useCallback(
    async (credentials: SignUpCredentials): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.register(credentials);
        return { success: true };
      } catch (error) {
        const errorMessage = handleAuthError(error);
        return { success: false, error: errorMessage };
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setAuth, handleAuthError]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.login({ username: email, password });
        await loadUser();

        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          error: null,
          authError: null,
        }));

        return { success: true };
      } catch (error) {
        const errorMessage = handleAuthError(error);
        return { success: false, error: errorMessage };
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setAuth, loadUser, handleAuthError]
  );

  const logout = useCallback(async (): Promise<AuthResult<void>> => {
    try {
      setAuth((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        authError: null,
      }));

      await authService.logout();
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return { success: false, error: errorMessage };
    } finally {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, [setAuth, handleAuthError]);

  return {
    // Auth state
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    user: auth.user,

    // Auth methods
    login,
    logout,
    register,
  };
};
