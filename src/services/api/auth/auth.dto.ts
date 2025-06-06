import { z } from "zod";

/**
 * Sign in credentials schema
 */
export const SignInDto = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type SignInDto = z.infer<typeof SignInDto>;

/**
 * Sign up request schema
 */
export const SignUpDto = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  code: z
    .string()
    .min(8)
    .regex(/^[a-zA-Z0-9]+$/),
});

export type SignUpDto = z.infer<typeof SignUpDto>;

/**
 * Refresh token request schema
 */
export const RefreshTokenDto = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenDto = z.infer<typeof RefreshTokenDto>;

/**
 * Sign up response schema
 */
export const SignUpResponseDto = z.object({
  userId: z.string().min(1),
  userSub: z.string().min(1),
  userConfirmed: z.boolean(),
});

export type SignUpResponseDto = z.infer<typeof SignUpResponseDto>;

/**
 * Get me request schema
 */
export const GetMeDto = z.object({
  authorization: z.string().min(1),
});

export type GetMeDto = z.infer<typeof GetMeDto>;

/**
 * Confirm sign up request schema
 */
export const ConfirmSignUpDto = z.object({
  username: z.string().min(1),
  confirmationCode: z.string().min(1),
});

export type ConfirmSignUpDto = z.infer<typeof ConfirmSignUpDto>;

/**
 * Resend confirmation code request schema
 */
export const ResendConfirmationCodeDto = z.object({
  username: z.string().min(1),
});

export type ResendConfirmationCodeDto = z.infer<
  typeof ResendConfirmationCodeDto
>;

/**
 * Forgot password request schema
 */
export const ForgotPasswordDto = z.object({
  username: z.string().min(1),
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDto>;

/**
 * Confirm forgot password request schema
 */
export const ConfirmForgotPasswordDto = z
  .object({
    username: z.string().min(1),
    confirmationCode: z.string().min(1),
    newPassword: z.string().min(1),
    newPasswordRepeat: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.newPasswordRepeat, {
    message: "Passwords do not match",
    path: ["newPasswordRepeat"],
  });

export type ConfirmForgotPasswordDto = z.infer<typeof ConfirmForgotPasswordDto>;

/**
 * Change password request schema
 */
export const ChangePasswordDto = z.object({
  username: z.string().min(1),
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;

/**
 * Sign in response schema
 */
export const SignInResponseDto = z.object({
  accessToken: z.string().min(1),
  idToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresIn: z.number(),
  tokenType: z.string().min(1),
});

export type SignInResponseDto = z.infer<typeof SignInResponseDto>;

/**
 * Get me response schema
 */
export const GetMeResponseDto = z.object({
  username: z.string().min(1),
});

export type GetMeResponseDto = z.infer<typeof GetMeResponseDto>;
