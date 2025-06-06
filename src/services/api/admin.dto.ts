import { z } from "zod";

export const AdminUserAttributesDto = z.object({
  email: z.string(),
  emailVerified: z.string(),
  sub: z.string(),
});

export type AdminUserAttributesDto = z.infer<typeof AdminUserAttributesDto>;

const AdminUserDto = z.object({
  username: z.string(),
  userCreateDate: z.date(),
  userLastModifiedDate: z.date(),
  enabled: z.boolean(),
  userStatus: z.string(),
  userAttributes: AdminUserAttributesDto,
});

export const AdminListUsersResponseDto = z.object({
  users: z.array(AdminUserDto),
  paginationToken: z.string().optional(),
});

export type AdminListUsersResponseDto = z.infer<
  typeof AdminListUsersResponseDto
>;

export const AdminDeleteUserParamsDto = z.object({
  username: z.string(),
});

export type AdminDeleteUserParamsDto = z.infer<typeof AdminDeleteUserParamsDto>;

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

export const AdminUpdateUserAttributesParamsDto = z.object({
  username: z.string(),
  attributes: z.record(z.string()),
});

export type AdminUpdateUserAttributesParamsDto = z.infer<
  typeof AdminUpdateUserAttributesParamsDto
>;

export const AdminAddUserToGroupParamsDto = z.object({
  username: z.string(),
  groupName: z.string(),
});

export type AdminAddUserToGroupParamsDto = z.infer<
  typeof AdminAddUserToGroupParamsDto
>;

export const AdminRemoveUserFromGroupParamsDto = z.object({
  username: z.string(),
  groupName: z.string(),
});

export type AdminRemoveUserFromGroupParamsDto = z.infer<
  typeof AdminRemoveUserFromGroupParamsDto
>;

export const CreateGroupParamsDto = z.object({
  groupName: z.string(),
  description: z.string().optional(),
  precedence: z.number().optional(),
  roleArn: z.string().optional(),
});

export type CreateGroupParamsDto = z.infer<typeof CreateGroupParamsDto>;

export const GetGroupParamsDto = z.object({
  groupName: z.string(),
});

export type GetGroupParamsDto = z.infer<typeof GetGroupParamsDto>;

export const UpdateGroupParamsDto = z.object({
  groupName: z.string(),
  description: z.string().optional(),
  precedence: z.number().optional(),
  roleArn: z.string().optional(),
});

export type UpdateGroupParamsDto = z.infer<typeof UpdateGroupParamsDto>;

export const DeleteGroupParamsDto = z.object({
  groupName: z.string(),
});

export type DeleteGroupParamsDto = z.infer<typeof DeleteGroupParamsDto>;

export const ListGroupsParamsDto = z.object({
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type ListGroupsParamsDto = z.infer<typeof ListGroupsParamsDto>;

export const ListUsersInGroupParamsDto = z.object({
  groupName: z.string(),
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type ListUsersInGroupParamsDto = z.infer<
  typeof ListUsersInGroupParamsDto
>;

export const AdminListGroupsForUserParamsDto = z.object({
  username: z.string(),
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type AdminListGroupsForUserParamsDto = z.infer<
  typeof AdminListGroupsForUserParamsDto
>;

export const ListUsersParamsDto = z.object({
  limit: z.number().min(1).max(100).optional(),
  filter: z.string().optional(),
  paginationToken: z.string().optional(),
});

export type ListUsersParamsDto = z.infer<typeof ListUsersParamsDto>;
