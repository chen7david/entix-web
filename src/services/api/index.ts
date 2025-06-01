import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";

const baseURL = import.meta.env.VITE_API_URL as string;
console.log(baseURL);
export const httpService = new HttpService(baseURL);
export const authService = new AuthService(httpService.getClient());

export const authApi = new AuthService(httpService.getClient());
