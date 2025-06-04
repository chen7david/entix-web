import { z } from "zod";

export const AdminListUsersResponseDto = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
    })
  ),
  paginationToken: z.string().optional(),
});

export type AdminListUsersResponseDto = z.infer<
  typeof AdminListUsersResponseDto
>;
