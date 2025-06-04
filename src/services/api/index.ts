import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";
import { StorageService } from "../storage/storage.service";
import { AdminService } from "./admin.service";

export const storageService = new StorageService();

export const httpService = new HttpService(
  import.meta.env.VITE_API_URL as string
);

export const authService = new AuthService(
  httpService.getClient(),
  storageService
);

export const adminService = new AdminService(httpService.getClient());
