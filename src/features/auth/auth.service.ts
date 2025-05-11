import { apiService } from '@/services/apiService';
import type {
  SignupRequest,
  SignupResponse,
  ConfirmSignupRequest,
  ConfirmSignupResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordResponse,
  ResendConfirmationCodeRequest,
  ResendConfirmationCodeResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from './auth.schemas';
import { clearAuthTokens, setAuthTokens } from './auth.store';

/**
 * Authentication service to handle user authentication operations
 */
export const AuthService = {
  /**
   * Sign up a new user
   * @param data User signup data
   * @returns Promise with the signup response
   */
  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await apiService.post<SignupResponse>('/api/v1/auth/signup', data);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

  /**
   * Confirm a user's signup with verification code
   * @param data Confirmation data including username and code
   * @returns Promise with the confirmation response
   */
  async confirmSignup(data: ConfirmSignupRequest): Promise<ConfirmSignupResponse> {
    try {
      const response = await apiService.post<ConfirmSignupResponse>(
        '/api/v1/auth/confirm-signup',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Confirmation failed:', error);
      throw error;
    }
  },

  /**
   * Request a password reset for a user
   * @param data Data containing the username
   * @returns Promise with the forgot password response
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiService.post<ForgotPasswordResponse>(
        '/api/v1/auth/forgot-password',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  },

  /**
   * Complete the password reset flow with verification code and new password
   * @param data Reset password data
   * @returns Promise with the confirmation response
   */
  async confirmForgotPassword(
    data: ConfirmForgotPasswordRequest
  ): Promise<ConfirmForgotPasswordResponse> {
    try {
      const response = await apiService.post<ConfirmForgotPasswordResponse>(
        '/api/v1/auth/confirm-forgot-password',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  },

  /**
   * Resend confirmation code to a user
   * @param data Data containing the username
   * @returns Promise with the response including code delivery details
   */
  async resendConfirmationCode(
    data: ResendConfirmationCodeRequest
  ): Promise<ResendConfirmationCodeResponse> {
    try {
      const response = await apiService.post<ResendConfirmationCodeResponse>(
        '/api/v1/auth/resend-confirmation-code',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Resend confirmation code failed:', error);
      throw error;
    }
  },

  /**
   * Change the password for an authenticated user
   * @param data Password change data
   * @returns Promise with the response
   */
  async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      const response = await apiService.post<ChangePasswordResponse>(
        '/api/v1/auth/change-password',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Password change failed:', error);
      throw error;
    }
  },

  /**
   * Sign out the current user
   * Clears tokens from storage and state
   */
  signOut(): void {
    // Clear tokens from storage
    clearAuthTokens();
  },

  /**
   * Refresh the access token using the refresh token
   * @returns Promise that resolves when token refresh is complete
   */
  async refreshToken(): Promise<boolean> {
    try {
      const response = await apiService.post('/api/v1/auth/refresh-token');
      const { accessToken, refreshToken } = response.data;

      if (!accessToken) {
        // If no access token in response, refresh failed
        clearAuthTokens();
        return false;
      }

      // Save the new tokens
      setAuthTokens({
        accessToken,
        refreshToken: refreshToken || null,
      });

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear tokens on refresh failure
      clearAuthTokens();
      return false;
    }
  },
};
