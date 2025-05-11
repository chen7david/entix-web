import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './auth.service';
import { apiService } from '@/services/apiService';
import {
  signupResponseSchema,
  confirmSignupResponseSchema,
  forgotPasswordResponseSchema,
  confirmForgotPasswordResponseSchema,
  resendConfirmationCodeResponseSchema,
  changePasswordResponseSchema,
} from './auth.schemas';
import type {
  SignupRequest,
  ConfirmSignupRequest,
  ForgotPasswordRequest,
  ConfirmForgotPasswordRequest,
  ResendConfirmationCodeRequest,
  ChangePasswordRequest,
} from './auth.schemas';
import * as authStore from '@/features/auth/auth.store';

vi.mock('@/services/apiService', () => ({
  apiService: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock('@/features/auth/auth.store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/features/auth/auth.store')>();
  return {
    ...actual,
    getAuthTokens: vi.fn(() => ({ accessToken: 'mockAccess', refreshToken: 'mockRefresh' })),
    setAuthTokens: vi.fn(),
    clearAuthTokens: vi.fn(),
  };
});

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signup', () => {
    it('should call apiService.post with correct URL and data, and parse response', async () => {
      const requestData: SignupRequest = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResponse = { userConfirmed: false, sub: '123-abc' };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.signup(requestData);

      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/signup', requestData);
      expect(result).toEqual(mockResponse);
      expect(() => signupResponseSchema.parse(mockResponse)).not.toThrow();
    });

    it('should re-throw error if apiService.post fails', async () => {
      const requestData: SignupRequest = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      const error = new Error('Network Error');
      (apiService.post as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      await expect(AuthService.signup(requestData)).rejects.toThrow('Network Error');
    });
  });

  describe('confirmSignup', () => {
    it('should call apiService.post and parse response', async () => {
      const requestData: ConfirmSignupRequest = { username: 'testuser', code: '123456' };
      const mockResponse = { success: true };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.confirmSignup(requestData);
      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/confirm-signup', requestData);
      expect(result).toEqual(mockResponse);
      expect(() => confirmSignupResponseSchema.parse(mockResponse)).not.toThrow();
    });
  });

  describe('forgotPassword', () => {
    it('should call apiService.post and parse response', async () => {
      const requestData: ForgotPasswordRequest = { username: 'testuser' };
      const mockResponse = {
        codeDeliveryDetails: {
          destination: 't***@e***.com',
          deliveryMedium: 'EMAIL',
          attributeName: 'email',
        },
      };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.forgotPassword(requestData);
      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/forgot-password', requestData);
      expect(result).toEqual(mockResponse);
      expect(() => forgotPasswordResponseSchema.parse(mockResponse)).not.toThrow();
    });
  });

  describe('confirmForgotPassword', () => {
    it('should call apiService.post and parse response', async () => {
      const requestData: ConfirmForgotPasswordRequest = {
        username: 'testuser',
        code: '123456',
        newPassword: 'newPassword123',
      };
      const mockResponse = { success: true };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.confirmForgotPassword(requestData);
      expect(apiService.post).toHaveBeenCalledWith(
        '/api/v1/auth/confirm-forgot-password',
        requestData
      );
      expect(result).toEqual(mockResponse);
      expect(() => confirmForgotPasswordResponseSchema.parse(mockResponse)).not.toThrow();
    });
  });

  describe('resendConfirmationCode', () => {
    it('should call apiService.post and parse response', async () => {
      const requestData: ResendConfirmationCodeRequest = { username: 'testuser' };
      const mockResponse = {
        codeDeliveryDetails: {
          destination: 't***@e***.com',
          deliveryMedium: 'EMAIL',
          attributeName: 'email',
        },
      };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.resendConfirmationCode(requestData);
      expect(apiService.post).toHaveBeenCalledWith(
        '/api/v1/auth/resend-confirmation-code',
        requestData
      );
      expect(result).toEqual(mockResponse);
      expect(() => resendConfirmationCodeResponseSchema.parse(mockResponse)).not.toThrow();
    });
  });

  describe('changePassword', () => {
    it('should call apiService.post and parse response', async () => {
      const requestData: ChangePasswordRequest = {
        accessToken: 'bodyAccessToken',
        previousPassword: 'oldPass',
        proposedPassword: 'newPass',
      };
      const mockResponse = { success: true };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.changePassword(requestData);
      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/change-password', requestData);
      expect(result).toEqual(mockResponse);
      expect(() => changePasswordResponseSchema.parse(mockResponse)).not.toThrow();
    });
  });

  describe('signOut', () => {
    it('should call clearAuthTokens', () => {
      AuthService.signOut();

      expect(authStore.clearAuthTokens).toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens successfully', async () => {
      const mockResponse = {
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.refreshToken();

      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/refresh-token');
      expect(authStore.setAuthTokens).toHaveBeenCalledWith({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      expect(result).toBe(true);
    });

    it('should handle refresh token without new refresh token', async () => {
      const mockResponse = {
        accessToken: 'newAccessToken',
        // No refresh token in response
      };
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.refreshToken();

      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/refresh-token');
      expect(authStore.setAuthTokens).toHaveBeenCalledWith({
        accessToken: 'newAccessToken',
        refreshToken: null,
      });
      expect(result).toBe(true);
    });

    it('should handle failed token refresh (no access token)', async () => {
      const mockResponse = {}; // Empty response with no tokens
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

      const result = await AuthService.refreshToken();

      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/refresh-token');
      expect(authStore.clearAuthTokens).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('should handle API errors during token refresh', async () => {
      const error = new Error('Network Error');
      (apiService.post as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      const result = await AuthService.refreshToken();

      expect(apiService.post).toHaveBeenCalledWith('/api/v1/auth/refresh-token');
      expect(authStore.clearAuthTokens).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
