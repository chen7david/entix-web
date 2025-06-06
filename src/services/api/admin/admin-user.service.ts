import { type AxiosInstance } from "axios";
import {
  AdminCreateUserParamsDto,
  AdminDeleteUserResponseDto,
  AdminListUsersParamsDto,
  AdminListUsersResponseDto,
  AdminUpdateUserAttributesParamsDto,
  AdminUserDto,
} from "./admin-user.dto";

/**
 * Service for managing administrative operations related to users
 */
export class AdminUserService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  /**
   * Retrieves a list of users with optional filtering and pagination
   */
  async getUsers(
    params?: AdminListUsersParamsDto
  ): Promise<AdminListUsersResponseDto> {
    const response = await this.http.get("api/v1/admin/users", {
      params: params || {},
    });
    return response.data;
  }

  /**
   * Deletes a user by username
   */
  async deleteUser(username: string): Promise<AdminDeleteUserResponseDto> {
    const response = await this.http.delete(`api/v1/admin/users/${username}`);
    return response.data;
  }

  /**
   * Creates a new user with admin privileges
   */
  async createUser(params: AdminCreateUserParamsDto): Promise<AdminUserDto> {
    const response = await this.http.post("api/v1/admin/users", params);
    return response.data;
  }

  /**
   * Updates user attributes
   */
  async updateUserAttributes(
    params: AdminUpdateUserAttributesParamsDto
  ): Promise<AdminUserDto> {
    const response = await this.http.put(
      `api/v1/admin/users/${params.username}/attributes`,
      { attributes: params.attributes }
    );
    return response.data;
  }

  /**
   * Retrieves a specific user by ID
   */
  async getUser(id: string): Promise<AdminUserDto> {
    const response = await this.http.get(`api/v1/admin/users/${id}`);
    return response.data;
  }
}
