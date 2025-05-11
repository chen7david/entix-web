import { apiService } from '@/services/apiService';
import type {
  CreateRoleRequest,
  // CreateRoleResponse, // Role type from schema can be used directly
  GetRolesResponse, // Role[] type
  UpdateRoleRequest,
  // UpdateRoleResponse, // Role type
  Role, // Individual role type
} from './role.schemas';
import {
  getRolesResponseSchema,
  // createRoleRequestSchema, // Not used directly
  createRoleResponseSchema, // This is `roleSchema`
  // updateRoleRequestSchema, // Not used directly
  updateRoleResponseSchema, // This is `roleSchema`
} from './role.schemas';

/**
 * TSDoc: RoleService provides methods for interacting with role management API endpoints.
 */
export const RoleService = {
  /**
   * TSDoc: Retrieves a list of all roles.
   * @returns {Promise<GetRolesResponse>} A promise that resolves to an array of roles.
   */
  async getAllRoles(): Promise<GetRolesResponse> {
    try {
      const response = await apiService.get('/roles');
      return getRolesResponseSchema.parse(response.data);
    } catch (error) {
      console.error('Failed to get all roles:', error);
      throw error;
    }
  },

  /**
   * TSDoc: Creates a new role.
   * @param {CreateRoleRequest} data - The data for the new role.
   * @returns {Promise<Role>} A promise that resolves to the created role.
   */
  async createRole(data: CreateRoleRequest): Promise<Role> {
    try {
      const response = await apiService.post('/roles', data);
      return createRoleResponseSchema.parse(response.data);
    } catch (error) {
      console.error('Failed to create role:', error);
      throw error;
    }
  },

  /**
   * TSDoc: Updates an existing role by its ID.
   * @param {number | string} id - The ID of the role to update.
   * @param {UpdateRoleRequest} data - The updated data for the role.
   * @returns {Promise<Role>} A promise that resolves to the updated role.
   */
  async updateRole(id: number | string, data: UpdateRoleRequest): Promise<Role> {
    try {
      const response = await apiService.put(`/roles/${id}`, data);
      return updateRoleResponseSchema.parse(response.data);
    } catch (error) {
      console.error(`Failed to update role ${id}:`, error);
      throw error;
    }
  },

  /**
   * TSDoc: Deletes a role by its ID.
   * @param {number | string} id - The ID of the role to delete.
   * @returns {Promise<void>} A promise that resolves when the role is successfully deleted.
   */
  async deleteRole(id: number | string): Promise<void> {
    try {
      await apiService.delete(`/roles/${id}`);
    } catch (error) {
      console.error(`Failed to delete role ${id}:`, error);
      throw error;
    }
  },
};
