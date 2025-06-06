import { z } from "zod";

export const AdminUserAttributesDto = z.object({
  email: z.string(),
  emailVerified: z.string(),
  sub: z.string(),
});

export const AdminListUsersResponseDto = z.object({
  users: z.array(
    z.object({
      username: z.string(),
      userCreateDate: z.date(),
      userLastModifiedDate: z.date(),
      enabled: z.boolean(),
      userStatus: z.string(),
      userAttributes: AdminUserAttributesDto,
    })
  ),
  paginationToken: z.string().optional(),
});

export type AdminListUsersResponseDto = z.infer<
  typeof AdminListUsersResponseDto
>;

export type AdminUserAttributesDto = z.infer<typeof AdminUserAttributesDto>;

export const AdminDeleteUserParamsDto = z.object({
  username: z.string(),
});

export type AdminDeleteUserParamsDto = z.infer<typeof AdminDeleteUserParamsDto>;
