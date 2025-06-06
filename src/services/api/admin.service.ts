// services/ApiService.ts
import { type AxiosInstance } from "axios";
import { SignInResponseDto, SignUpResponseDto } from "./auth.dto";
import {
  AdminDeleteUserParamsDto,
  AdminListUsersResponseDto,
} from "./admin.dto";

export class AdminService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getUsers(): Promise<AdminListUsersResponseDto> {
    const response = await this.http.get("api/v1/admin/users");
    return response.data;
  }

  async deleteUser(username: string): Promise<AdminDeleteUserParamsDto> {
    const response = await this.http.delete(`api/v1/admin/users/${username}`);
    return response.data;
  }

  async getRoles(): Promise<SignUpResponseDto> {
    const response = await this.http.get("api/v1/admin/roles");
    return response.data;
  }

  async getPermissions(): Promise<SignUpResponseDto> {
    const response = await this.http.get("api/v1/admin/permissions");
    return response.data;
  }

  async getUser(id: string): Promise<SignUpResponseDto> {
    const response = await this.http.get(`api/v1/admin/users/${id}`);
    return response.data;
  }

  async getRole(id: string): Promise<SignInResponseDto> {
    const response = await this.http.get(`api/v1/admin/roles/${id}`);
    return response.data;
  }

  async getPermission(id: string): Promise<SignInResponseDto> {
    const response = await this.http.get(`api/v1/admin/permissions/${id}`);
    return response.data;
  }
}
