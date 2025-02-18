import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  resendSignUpCode,
} from "aws-amplify/auth";
import { type SignUpInput } from "@aws-amplify/auth";

export type AuthError = {
  code: string;
  message: string;
  name: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  username?: string; // Optional, in case we want to store it as a custom attribute
};

export class AuthService {
  /**
   * Register a new user
   * @param credentials User registration credentials
   * @returns Promise resolving to the signup result
   */
  async register(credentials: SignUpCredentials) {
    try {
      const signUpData: SignUpInput = {
        username: credentials.email, // Use email as username
        password: credentials.password,
        options: {
          userAttributes: {
            email: credentials.email,
            // Store username as a custom attribute if provided
            ...(credentials.username && { preferred_username: credentials.username }),
          },
        },
      };

      const result = await signUp(signUpData);
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Confirm user registration with verification code
   * @param username Username or email
   * @param code Verification code
   */
  async confirmRegistration(username: string, code: string) {
    try {
      const result = await confirmSignUp({
        username,
        confirmationCode: code,
      });
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Resend verification code for email verification
   * @param username Username or email
   */
  async resendVerificationCode(username: string) {
    try {
      const result = await resendSignUpCode({
        username,
      });
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Sign in a user
   * @param credentials Login credentials
   */
  async login(credentials: LoginCredentials) {
    try {
      const result = await signIn({
        username: credentials.username,
        password: credentials.password,
      });
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Sign out the current user
   */
  async logout() {
    try {
      await signOut();
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Request a password reset for a user
   * @param username Username or email
   */
  async requestPasswordReset(username: string) {
    try {
      const result = await resetPassword({
        username,
      });
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Complete the password reset process
   * @param username Username or email
   * @param code Verification code
   * @param newPassword New password
   */
  async confirmPasswordReset(
    username: string,
    code: string,
    newPassword: string
  ) {
    try {
      const result = await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
      return result;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle and standardize error responses
   * @param error Original error from Amplify
   * @returns Standardized error object
   */
  private handleError(error: any): AuthError {
    console.error("Auth Error:", error);
    return {
      code: error.code || "UnknownError",
      message: error.message || "An unknown error occurred",
      name: error.name || "Error",
    };
  }
}

// Export a singleton instance
export const authService = new AuthService();
