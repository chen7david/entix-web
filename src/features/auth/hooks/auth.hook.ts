import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authAtom, loadUserAtom } from "@/features/auth/store/auth.store";
import { authService } from "@/features/auth/services/auth.service";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const loadUser = useSetAtom(loadUserAtom);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string, redirectUrl?: string) => {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await authService.login({ username: email, password });
        await loadUser();
        navigate(redirectUrl || "/dashboard");
      } catch (err: any) {
        setAuth((prev) => ({
          ...prev,
          error: err.message || "An error occurred during login",
          isLoading: false,
        }));
      }
    },
    [setAuth, loadUser, navigate]
  );

  const logout = useCallback(
    async (redirectUrl?: string) => {
      try {
        await authService.logout();
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          user: null,
        }));
        navigate(redirectUrl || "/login");
      } catch (error: any) {
        console.error("Error signing out:", error);
        setAuth((prev) => ({
          ...prev,
          error: error.message || "An error occurred during logout",
        }));
      }
    },
    [setAuth, navigate]
  );

  return {
    login,
    logout,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    user: auth.user,
  };
};
