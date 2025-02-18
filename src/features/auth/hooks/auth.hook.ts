import { authService } from "@/features/auth/services/auth.service";
import { authAtom, loadUserAtom } from "@/features/auth/store/auth.store";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthError,
  SignUpCredentials,
} from "@/features/auth/services/auth.service";

/**
 * Custom hook for managing authentication state and operations
 * @returns Object containing auth state and methods
 */
export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const loadUser = useSetAtom(loadUserAtom);
  const navigate = useNavigate();

  const handleAuthError = useCallback(
    (error: unknown) => {
      const authError = error as AuthError;
      setAuth((prev) => ({
        ...prev,
        error: authError.message,
        authError: authError, // Store the full error object
        isLoading: false,
      }));
      return authError; // Return the error for immediate use
    },
    [setAuth]
  );

  const clearError = useCallback(() => {
    setAuth((prev) => ({
      ...prev,
      error: null,
      authError: null,
    }));
  }, [setAuth]);

  const withLoading = useCallback(
    <T>(promise: Promise<T>) => {
      setAuth((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        authError: null,
      }));
      return promise.finally(() =>
        setAuth((prev) => ({ ...prev, isLoading: false }))
      );
    },
    [setAuth]
  );

  const register = useCallback(
    async (credentials: SignUpCredentials) => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        const result = await withLoading(authService.register(credentials));
        navigate("/auth/verify-email");
        return result;
      } catch (error) {
        const authError = handleAuthError(error);
        throw authError; // Re-throw to allow components to handle specific error cases
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setAuth, handleAuthError, withLoading]
  );

  const login = useCallback(
    async (email: string, password: string, redirectUrl?: string) => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await withLoading(authService.login({ username: email, password }));
        await loadUser();
        navigate(redirectUrl || "/dashboard");
      } catch (error) {
        handleAuthError(error);
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [loadUser, navigate, handleAuthError, setAuth, withLoading]
  );

  const verifyEmail = useCallback(
    async (email: string, code: string) => {
      try {
        await withLoading(authService.confirmRegistration(email, code));
        navigate("/auth/login");
      } catch (error) {
        handleAuthError(error);
      }
    },
    [navigate, handleAuthError, withLoading]
  );

  const resendVerificationCode = useCallback(
    async (email: string) => {
      try {
        await withLoading(authService.resendVerificationCode(email));
      } catch (error) {
        handleAuthError(error);
      }
    },
    [handleAuthError, withLoading]
  );

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        await withLoading(authService.requestPasswordReset(email));
      } catch (error) {
        handleAuthError(error);
      }
    },
    [handleAuthError, withLoading]
  );

  const resetPassword = useCallback(
    async (email: string, code: string, newPassword: string) => {
      try {
        await withLoading(
          authService.confirmPasswordReset(email, code, newPassword)
        );
        navigate("/auth/login");
      } catch (error) {
        handleAuthError(error);
      }
    },
    [navigate, handleAuthError, withLoading]
  );

  const logout = useCallback(
    async (redirectUrl?: string) => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await withLoading(authService.logout());
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          user: null,
        }));
        navigate(redirectUrl || "/login");
      } catch (error) {
        handleAuthError(error);
      } finally {
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setAuth, navigate, handleAuthError, withLoading]
  );

  return {
    // Auth state
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    authError: auth.authError as AuthError | null, // Expose the full error object
    user: auth.user,

    // Auth methods
    login,
    logout,
    register,
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    clearError, // Expose method to clear errors
  };
};
