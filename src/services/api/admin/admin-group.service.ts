import { type AxiosInstance } from "axios";
import {
  AdminAddUserToGroupParamsDto,
  AdminListGroupsForUserParamsDto,
  AdminRemoveUserFromGroupParamsDto,
  CreateGroupParamsDto,
  DeleteGroupParamsDto,
  GetGroupParamsDto,
  ListGroupsParamsDto,
  ListUsersInGroupParamsDto,
  UpdateGroupParamsDto,
} from "./admin-group.dto";

/**
 * Service for managing administrative operations related to groups
 */
export class AdminGroupService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Retrieves a list of groups with optional pagination
   */
  async getGroups(params?: ListGroupsParamsDto) {
    const response = await this.http.get("api/v1/admin/groups", {
      params: params || {},
    });
    return response.data;
  }

  /**
   * Creates a new group
   */
  async createGroup(params: CreateGroupParamsDto) {
    const response = await this.http.post("api/v1/admin/groups", params);
    return response.data;
  }

  /**
   * Gets details for a specific group
   */
  async getGroup(params: GetGroupParamsDto) {
    const response = await this.http.get(
      `api/v1/admin/groups/${params.groupName}`
    );
    return response.data;
  }

  /**
   * Updates an existing group
   */
  async updateGroup(params: UpdateGroupParamsDto) {
    const response = await this.http.put(
      `api/v1/admin/groups/${params.groupName}`,
      params
    );
    return response.data;
  }

  /**
   * Deletes a group
   */
  async deleteGroup(params: DeleteGroupParamsDto) {
    const response = await this.http.delete(
      `api/v1/admin/groups/${params.groupName}`
    );
    return response.data;
  }

  /**
   * Lists users in a specific group
   */
  async listUsersInGroup(params: ListUsersInGroupParamsDto) {
    const response = await this.http.get(
      `api/v1/admin/groups/${params.groupName}/users`,
      { params: { limit: params.limit, nextToken: params.nextToken } }
    );
    return response.data;
  }

  /**
   * Lists groups for a specific user
   */
  async listGroupsForUser(params: AdminListGroupsForUserParamsDto) {
    const response = await this.http.get(
      `api/v1/admin/users/${params.username}/groups`,
      { params: { limit: params.limit, nextToken: params.nextToken } }
    );
    return response.data;
  }

  /**
   * Adds a user to a group
   */
  async addUserToGroup(params: AdminAddUserToGroupParamsDto) {
    const response = await this.http.post(
      `api/v1/admin/users/${params.username}/groups`,
      { groupName: params.groupName }
    );
    return response.data;
  }

  /**
   * Removes a user from a group
   */
  async removeUserFromGroup(params: AdminRemoveUserFromGroupParamsDto) {
    const response = await this.http.delete(
      `api/v1/admin/users/${params.username}/groups/${params.groupName}`
    );
    return response.data;
  }
}
