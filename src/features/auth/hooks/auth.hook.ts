import { authService } from "@/features/auth/services/auth.service";
import { authAtom, loadUserAtom } from "@/features/auth/store/auth.store";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import type { AuthUser } from "aws-amplify/auth";
import type {
  AuthError,
  SignUpCredentials,
  // User, // Assuming User type is exported from auth.service or a types file - temporarily removed
} from "@/features/auth/services/auth.service";

/**
 * Represents the result of an authentication operation.
 * @template T - The type of data returned on success.
 */
type AuthResult<T> = {
  /** The data returned upon a successful operation. */
  data?: T;
  /** An error message if the operation failed. */
  error?: string;
  /** A boolean indicating whether the operation was successful. */
  success: boolean;
};

/**
 * Describes the authentication state managed by the useAuth hook.
 * @property {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @property {AuthUser | null} user - The authenticated user object from AWS Amplify, or null if not authenticated.
 * @property {boolean} isLoading - True if an authentication operation is in progress.
 * @property {string | null} error - A user-friendly error message, if any.
 * @property {AuthError | null} authError - The detailed authentication error object, if any.
 */
type AuthHookState = {
  isAuthenticated: boolean;
  user: AuthUser | null; // Use AuthUser type
  isLoading: boolean;
  error: string | null;
  authError: AuthError | null;
};

/**
 * Describes the authentication methods provided by the useAuth hook.
 * @property {(email: string, password: string) => Promise<AuthResult<void>>} login - Logs in a user.
 * @property {() => Promise<AuthResult<void>>} logout - Logs out the current user.
 * @property {(credentials: SignUpCredentials) => Promise<AuthResult<void>>} register - Registers a new user.
 * @property {(email: string, code: string) => Promise<AuthResult<void>>} verifyEmail - Verifies a user's email with a confirmation code.
 * @property {(email: string) => Promise<AuthResult<void>>} resendVerificationCode - Resends the email verification code.
 * @property {(email: string) => Promise<AuthResult<void>>} requestPasswordReset - Initiates a password reset request.
 * @property {(email: string, code: string, newPassword: string) => Promise<AuthResult<void>>} confirmPasswordReset - Confirms a password reset with a code and new password.
 */
type AuthHookMethods = {
  login: (email: string, password: string) => Promise<AuthResult<void>>;
  logout: () => Promise<AuthResult<void>>;
  register: (credentials: SignUpCredentials) => Promise<AuthResult<void>>;
  verifyEmail: (email: string, code: string) => Promise<AuthResult<void>>;
  resendVerificationCode: (email: string) => Promise<AuthResult<void>>;
  requestPasswordReset: (email: string) => Promise<AuthResult<void>>;
  confirmPasswordReset: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<AuthResult<void>>;
};

/**
 * Custom hook for managing authentication state and operations.
 * Provides access to the authentication state and methods to perform authentication actions.
 *
 * @returns {AuthHookState & AuthHookMethods} An object containing authentication state and methods.
 */
export const useAuth = (): AuthHookState & AuthHookMethods => {
  const [auth, setAuth] = useAtom(authAtom);
  const loadUser = useSetAtom(loadUserAtom);

  /**
   * Handles authentication errors by updating the auth state.
   * @param {unknown} error - The error object caught.
   * @returns {string} The error message.
   * @private
   */
  const handleAuthError = useCallback(
    (error: unknown): string => {
      let errorMessage = "An unexpected error occurred.";
      let resolvedAuthError: AuthError | null = null;

      if (error && typeof error === "object" && "message" in error) {
        // Basic check if it's an Amplify AuthError or similar structure
        if ("name" in error && typeof error.name === "string") {
          resolvedAuthError = error as AuthError;
          errorMessage =
            typeof error.message === "string" ? error.message : errorMessage;
        } else if (typeof error.message === "string") {
          // If it's a generic error with a message property
          errorMessage = error.message;
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setAuth((prev) => ({
        ...prev,
        error: errorMessage,
        authError: resolvedAuthError,
        isLoading: false,
      }));
      return errorMessage;
    },
    [setAuth]
  );

  /**
   * Registers a new user.
   * @param {SignUpCredentials} credentials - The user's registration details.
   * @returns {Promise<AuthResult<void>>} The result of the registration operation.
   */
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

  /**
   * Verifies a user's email with a confirmation code.
   * @param {string} email - The user's email.
   * @param {string} code - The verification code.
   * @returns {Promise<AuthResult<void>>} The result of the verification operation.
   */
  const verifyEmail = useCallback(
    async (email: string, code: string): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.confirmRegistration(email, code);
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

  /**
   * Resends the email verification code to the user.
   * @param {string} email - The user's email.
   * @returns {Promise<AuthResult<void>>} The result of the resend operation.
   */
  const resendVerificationCode = useCallback(
    async (email: string): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.resendVerificationCode(email);
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

  /**
   * Logs in a user with their email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<AuthResult<void>>} The result of the login operation.
   */
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

  /**
   * Logs out the currently authenticated user.
   * @returns {Promise<AuthResult<void>>} The result of the logout operation.
   */
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

  /**
   * Initiates a password reset request for the given email.
   * @param {string} email - The user's email.
   * @returns {Promise<AuthResult<void>>} The result of the password reset request.
   */
  const requestPasswordReset = useCallback(
    async (email: string): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.requestPasswordReset(email);
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

  /**
   * Confirms a password reset using the provided email, code, and new password.
   * @param {string} email - The user's email.
   * @param {string} code - The confirmation code.
   * @param {string} newPassword - The new password.
   * @returns {Promise<AuthResult<void>>} The result of the password reset confirmation.
   */
  const confirmPasswordReset = useCallback(
    async (
      email: string,
      code: string,
      newPassword: string
    ): Promise<AuthResult<void>> => {
      try {
        setAuth((prev) => ({
          ...prev,
          isLoading: true,
          error: null,
          authError: null,
        }));

        await authService.confirmPasswordReset(email, code, newPassword);
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

  return {
    /** Whether the user is currently authenticated. */
    isAuthenticated: auth.isAuthenticated,
    /** True if an authentication operation is in progress. */
    isLoading: auth.isLoading,
    /** A user-friendly error message, if any. */
    error: auth.error,
    /** The authenticated user object, or null if not authenticated. */
    user: auth.user,
    /** The detailed authentication error object, if any. */
    authError: auth.authError,

    // Auth methods
    login,
    logout,
    register,
    verifyEmail,
    resendVerificationCode,
    requestPasswordReset,
    confirmPasswordReset,
  };
};
