import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { getCurrentUser, type AuthUser } from "aws-amplify/auth";
import type { AuthError } from "@/features/auth/services/auth.service";

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  authError: AuthError | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  authError: null,
};

export const authAtom = atomWithStorage<AuthState>("auth", initialState);

export const authLoadingAtom = atom(
  (get) => get(authAtom).isLoading,
  (get, set, loading: boolean) =>
    set(authAtom, { ...get(authAtom), isLoading: loading })
);

export const loadUserAtom = atom(null, async (_, set) => {
  try {
    set(authLoadingAtom, true);
    const user = await getCurrentUser();
    set(authAtom, {
      isAuthenticated: true,
      user,
      isLoading: false,
      error: null,
      authError: null,
    });
  } catch (error) {
    console.error(error);
    set(authAtom, {
      ...initialState,
      isLoading: false,
      error: "Session expired",
      authError: error as AuthError,
    });
  }
});
