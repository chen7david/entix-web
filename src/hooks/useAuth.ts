import { signIn, signOut, type SignInInput } from "aws-amplify/auth";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authAtom, loadUserAtom } from "../store/auth";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const loadUser = useSetAtom(loadUserAtom);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const signInInput: SignInInput = {
          username: email,
          password,
        };

        await signIn(signInInput);
        await loadUser();
        navigate("/dashboard");
      } catch (err) {
        setAuth((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : "An error occurred",
          isLoading: false,
        }));
      }
    },
    [setAuth, loadUser, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await signOut();
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
      }));
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [setAuth, navigate]);

  return {
    login,
    logout,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    user: auth.user,
  };
};
