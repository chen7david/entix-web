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
        error: authError.message || "An unexpected error occurred",
        isLoading: false,
      }));
    },
    [setAuth]
  );

  const withLoading = useCallback(
    <T>(promise: Promise<T>) => {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      return promise.finally(() =>
        setAuth((prev) => ({ ...prev, isLoading: false }))
      );
    },
    [setAuth]
  );

  const login = useCallback(
    async (email: string, password: string, redirectUrl?: string) => {
      try {
        await withLoading(authService.login({ username: email, password }));
        await loadUser();
        navigate(redirectUrl || "/dashboard");
      } catch (error) {
        handleAuthError(error);
      }
    },
    [loadUser, navigate, handleAuthError, withLoading]
  );

  const register = useCallback(
    async (values: SignUpCredentials) => {
      try {
        await withLoading(authService.register(values));
        navigate(
          "/auth/verify-email?email=" + encodeURIComponent(values.email)
        );
      } catch (error) {
        handleAuthError(error);
      }
    },
    [navigate, handleAuthError, withLoading]
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
        await withLoading(authService.logout());
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          user: null,
        }));
        navigate(redirectUrl || "/login");
      } catch (error) {
        handleAuthError(error);
      }
    },
    [setAuth, navigate, handleAuthError, withLoading]
  );

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
    verifyEmail,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
  };
};
