import { z } from 'zod';

// Endpoint: POST /api/v1/auth/signup
export const signupRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type SignupRequest = z.infer<typeof signupRequestSchema>;

export const signupResponseSchema = z.object({
  userConfirmed: z.boolean(),
  sub: z.string(), // Assuming 'sub' is a user identifier like Cognito UserSub
});
export type SignupResponse = z.infer<typeof signupResponseSchema>;

// Endpoint: POST /api/v1/auth/confirm-signup
export const confirmSignupRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  confirmationCode: z.string().min(1, 'Confirmation code is required'),
});
export type ConfirmSignupRequest = z.infer<typeof confirmSignupRequestSchema>;

export const confirmSignupResponseSchema = z.object({
  success: z.boolean(),
});
export type ConfirmSignupResponse = z.infer<typeof confirmSignupResponseSchema>;

// Endpoint: POST /api/v1/auth/forgot-password
export const forgotPasswordRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;

export const forgotPasswordResponseSchema = z.object({
  codeDeliveryDetails: z.object({
    destination: z.string(),
    deliveryMedium: z.string(), // Could be z.enum(['EMAIL', 'SMS']) if known
    attributeName: z.string(),
  }),
});
export type ForgotPasswordResponse = z.infer<typeof forgotPasswordResponseSchema>;

// Endpoint: POST /api/v1/auth/confirm-forgot-password
export const confirmForgotPasswordRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  code: z.string().min(1, 'Confirmation code is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});
export type ConfirmForgotPasswordRequest = z.infer<typeof confirmForgotPasswordRequestSchema>;

export const confirmForgotPasswordResponseSchema = z.object({
  success: z.boolean(),
});
export type ConfirmForgotPasswordResponse = z.infer<typeof confirmForgotPasswordResponseSchema>;

// Endpoint: POST /api/v1/auth/resend-confirmation-code
export const resendConfirmationCodeRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});
export type ResendConfirmationCodeRequest = z.infer<typeof resendConfirmationCodeRequestSchema>;

export const resendConfirmationCodeResponseSchema = z.object({
  codeDeliveryDetails: z.object({
    destination: z.string(),
    deliveryMedium: z.string(),
    attributeName: z.string(),
  }),
});
export type ResendConfirmationCodeResponse = z.infer<typeof resendConfirmationCodeResponseSchema>;

// Endpoint: POST /api/v1/auth/change-password
export const changePasswordRequestSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  previousPassword: z.string().min(1, 'Previous password is required'),
  proposedPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;

export const changePasswordResponseSchema = z.object({
  success: z.boolean(),
});
export type ChangePasswordResponse = z.infer<typeof changePasswordResponseSchema>;

// Generic Error Response for 400 Bad Request (can be reused)
export const authErrorResponseSchema = z.object({
  error: z.string(),
});
export type AuthErrorResponse = z.infer<typeof authErrorResponseSchema>;

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(), // refreshToken might not always be re-issued
});
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
