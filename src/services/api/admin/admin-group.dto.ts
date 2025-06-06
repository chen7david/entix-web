import { z } from "zod";

/**
 * Add user to group params schema
 */
export const AdminAddUserToGroupParamsDto = z.object({
  username: z.string(),
  groupName: z.string(),
});

export type AdminAddUserToGroupParamsDto = z.infer<
  typeof AdminAddUserToGroupParamsDto
>;

/**
 * Remove user from group params schema
 */
export const AdminRemoveUserFromGroupParamsDto = z.object({
  username: z.string(),
  groupName: z.string(),
});

export type AdminRemoveUserFromGroupParamsDto = z.infer<
  typeof AdminRemoveUserFromGroupParamsDto
>;

/**
 * Create group params schema
 */
export const CreateGroupParamsDto = z.object({
  groupName: z.string(),
  description: z.string().optional(),
  precedence: z.number().optional(),
  roleArn: z.string().optional(),
});

export type CreateGroupParamsDto = z.infer<typeof CreateGroupParamsDto>;

/**
 * Get group params schema
 */
export const GetGroupParamsDto = z.object({
  groupName: z.string(),
});

export type GetGroupParamsDto = z.infer<typeof GetGroupParamsDto>;

/**
 * Update group params schema
 */
export const UpdateGroupParamsDto = z.object({
  groupName: z.string(),
  description: z.string().optional(),
  precedence: z.number().optional(),
  roleArn: z.string().optional(),
});

export type UpdateGroupParamsDto = z.infer<typeof UpdateGroupParamsDto>;

/**
 * Delete group params schema
 */
export const DeleteGroupParamsDto = z.object({
  groupName: z.string(),
});

export type DeleteGroupParamsDto = z.infer<typeof DeleteGroupParamsDto>;

/**
 * List groups params schema
 */
export const ListGroupsParamsDto = z.object({
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type ListGroupsParamsDto = z.infer<typeof ListGroupsParamsDto>;

/**
 * List users in group params schema
 */
export const ListUsersInGroupParamsDto = z.object({
  groupName: z.string(),
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type ListUsersInGroupParamsDto = z.infer<
  typeof ListUsersInGroupParamsDto
>;

/**
 * List groups for user params schema
 */
export const AdminListGroupsForUserParamsDto = z.object({
  username: z.string(),
  limit: z.number().optional(),
  nextToken: z.string().optional(),
});

export type AdminListGroupsForUserParamsDto = z.infer<
  typeof AdminListGroupsForUserParamsDto
>;
