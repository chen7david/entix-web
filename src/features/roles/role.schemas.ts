import { z } from 'zod';

// Base Role Schema (used in multiple responses)
export const roleSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.string().datetime(), // Or z.coerce.date()
  updatedAt: z.string().datetime(), // Or z.coerce.date()
});
export type Role = z.infer<typeof roleSchema>;

// Endpoint: GET /api/v1/roles
export const getRolesResponseSchema = z.array(roleSchema);
export type GetRolesResponse = z.infer<typeof getRolesResponseSchema>;

// Endpoint: POST /api/v1/roles
export const createRoleRequestSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
});
export type CreateRoleRequest = z.infer<typeof createRoleRequestSchema>;

export const createRoleResponseSchema = roleSchema; // Response is a single role object
export type CreateRoleResponse = z.infer<typeof createRoleResponseSchema>;

// Error for POST /api/v1/roles (409 Conflict)
export const createRoleConflictErrorSchema = z.object({
  error: z.string(), // "Role with this name already exists"
});
export type CreateRoleConflictError = z.infer<typeof createRoleConflictErrorSchema>;

// Endpoint: PUT /api/v1/roles/:id
export const updateRoleRequestSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
});
export type UpdateRoleRequest = z.infer<typeof updateRoleRequestSchema>;

export const updateRoleResponseSchema = roleSchema; // Response is the updated role object
export type UpdateRoleResponse = z.infer<typeof updateRoleResponseSchema>;

// Error for PUT /api/v1/roles/:id (404 Not Found)
export const roleNotFoundErrorSchema = z.object({
  error: z.string(), // "Role not found"
});
export type RoleNotFoundError = z.infer<typeof roleNotFoundErrorSchema>;

// Endpoint: DELETE /api/v1/roles/:id
// No request body or response body for 204 No Content.
