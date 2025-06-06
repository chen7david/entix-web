import { z } from "zod";

/**
 * User attributes schema
 */
export const AdminUserAttributesDto = z.object({
  email: z.string(),
  emailVerified: z.string(),
  sub: z.string(),
});

export type AdminUserAttributesDto = z.infer<typeof AdminUserAttributesDto>;

/**
 * User schema
 */
export const AdminUserDto = z.object({
  username: z.string(),
  userCreateDate: z.date(),
  userLastModifiedDate: z.date(),
  enabled: z.boolean(),
  userStatus: z.string(),
  userAttributes: AdminUserAttributesDto,
});

export type AdminUserDto = z.infer<typeof AdminUserDto>;

/**
 * List users response schema
 */
export const AdminListUsersResponseDto = z.object({
  users: z.array(AdminUserDto),
  paginationToken: z.string().optional(),
});

export type AdminListUsersResponseDto = z.infer<
  typeof AdminListUsersResponseDto
>;

/**
 * Delete user response schema
 */
export const AdminDeleteUserResponseDto = z.object({
  username: z.string(),
});

export type AdminDeleteUserResponseDto = z.infer<
  typeof AdminDeleteUserResponseDto
>;

/**
 * Create user params schema
 */
export const AdminCreateUserParamsDto = z.object({
  username: z.string(),
  password: z.string().optional(),
  email: z.string(),
  phone: z.string().optional(),
  temporaryPassword: z.string().optional(),
  messageAction: z.enum(["RESEND", "SUPPRESS"]).optional(),
  attributes: z.record(z.string()).optional(),
});

export type AdminCreateUserParamsDto = z.infer<typeof AdminCreateUserParamsDto>;

/**
 * Update user attributes params schema
 */
export const AdminUpdateUserAttributesParamsDto = z.object({
  username: z.string(),
  attributes: z.record(z.string()),
});

export type AdminUpdateUserAttributesParamsDto = z.infer<
  typeof AdminUpdateUserAttributesParamsDto
>;

/**
 * List users params schema
 */
export const AdminListUsersParamsDto = z.object({
  limit: z.number().min(1).max(100).optional(),
  filter: z.string().optional(),
  paginationToken: z.string().optional(),
});

export type AdminListUsersParamsDto = z.infer<typeof AdminListUsersParamsDto>;
