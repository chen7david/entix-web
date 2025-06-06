import { HttpService } from "./http.service";
import { AuthService } from "./auth";
import { StorageService } from "../storage/storage.service";
import { AdminUserService } from "./admin/admin-user.service";
import { AdminGroupService } from "./admin/admin-group.service";

/**
 * Storage service singleton
 */
export const storageService = new StorageService();

/**
 * HTTP service singleton
 */
export const httpService = new HttpService(
  import.meta.env.VITE_API_URL as string
);

/**
 * Auth service singleton
 */
export const authService = new AuthService(
  httpService.getClient(),
  storageService
);

/**
 * Admin user service singleton
 */
export const adminUserService = new AdminUserService(httpService.getClient());

/**
 * Admin group service singleton
 */
export const adminGroupService = new AdminGroupService(httpService.getClient());

/**
 * Export all service types
 */
export type { AuthService } from "./auth";
export type { AdminUserService } from "./admin/admin-user.service";
export type { AdminGroupService } from "./admin/admin-group.service";
export type { HttpService } from "./http.service";
export type { StorageService } from "../storage/storage.service";

/**
 * Re-export all DTO types for convenience
 */
export * from "./auth";
export * from "./admin";
