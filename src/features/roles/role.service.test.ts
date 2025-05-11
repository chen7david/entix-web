import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleService } from './role.service';
import { apiService } from '@/services/apiService';
import {
  getRolesResponseSchema,
  createRoleResponseSchema,
  updateRoleResponseSchema,
  // roleSchema, // Not directly used for parsing in tests, types are sufficient
} from './role.schemas';
import type { GetRolesResponse, CreateRoleRequest, UpdateRoleRequest, Role } from './role.schemas';

vi.mock('@/services/apiService', () => ({
  apiService: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('RoleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRole: Role = {
    id: 1,
    name: 'Administrator',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockRolesList: GetRolesResponse = [mockRole, { ...mockRole, id: 2, name: 'Editor' }];

  describe('getAllRoles', () => {
    it('should call apiService.get and parse response', async () => {
      (apiService.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockRolesList });

      const result = await RoleService.getAllRoles();

      expect(apiService.get).toHaveBeenCalledWith('/roles');
      expect(result).toEqual(mockRolesList);
      expect(() => getRolesResponseSchema.parse(mockRolesList)).not.toThrow();
    });

    it('should re-throw error if apiService.get fails', async () => {
      const error = new Error('API Error');
      (apiService.get as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      await expect(RoleService.getAllRoles()).rejects.toThrow('API Error');
    });
  });

  describe('createRole', () => {
    it('should call apiService.post with data and parse response', async () => {
      const requestData: CreateRoleRequest = { name: 'NewRole' };
      const expectedResponse = { ...mockRole, name: requestData.name, id: 3 }; // Simulate new ID
      (apiService.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: expectedResponse });

      const result = await RoleService.createRole(requestData);

      expect(apiService.post).toHaveBeenCalledWith('/roles', requestData);
      expect(result).toEqual(expectedResponse);
      expect(() => createRoleResponseSchema.parse(result)).not.toThrow();
    });
  });

  describe('updateRole', () => {
    it('should call apiService.put with id and data, and parse response', async () => {
      const roleId = 1;
      const requestData: UpdateRoleRequest = { name: 'UpdatedRoleName' };
      const expectedResponse = { ...mockRole, id: roleId, name: requestData.name };
      (apiService.put as ReturnType<typeof vi.fn>).mockResolvedValue({ data: expectedResponse });

      const result = await RoleService.updateRole(roleId, requestData);

      expect(apiService.put).toHaveBeenCalledWith(`/roles/${roleId}`, requestData);
      expect(result).toEqual(expectedResponse);
      expect(() => updateRoleResponseSchema.parse(result)).not.toThrow();
    });
  });

  describe('deleteRole', () => {
    it('should call apiService.delete with id', async () => {
      const roleId = 1;
      (apiService.delete as ReturnType<typeof vi.fn>).mockResolvedValue({});

      await RoleService.deleteRole(roleId);

      expect(apiService.delete).toHaveBeenCalledWith(`/roles/${roleId}`);
    });

    it('should re-throw error if apiService.delete fails', async () => {
      const roleId = 1;
      const error = new Error('Deletion Failed');
      (apiService.delete as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      await expect(RoleService.deleteRole(roleId)).rejects.toThrow('Deletion Failed');
    });
  });
});
