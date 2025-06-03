import axios, { type AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { message } from "antd";
import { authService } from "./index";

export class HttpService {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });

    this.registerRequestInterceptor();
    this.registerRefreshTokenInterceptor();
    this.registerResponseInterceptor();
  }

  getClient() {
    return this.http;
  }

  async get<T = unknown>(url: string) {
    const response = await this.http.get<T>(url);
    return response;
  }

  async post<T = unknown>(url: string, data: unknown) {
    const response = await this.http.post<T>(url, data);
    return response;
  }

  private registerRequestInterceptor(): void {
    this.http.interceptors.request.use((config) => {
      const token = authService.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private registerRefreshTokenInterceptor(): void {
    console.log("called registerRefreshTokenInterceptor");
    createAuthRefreshInterceptor(this.http, async (failedRequest) => {
      try {
        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await authService.refreshToken({ refreshToken }); // Assume this returns { accessToken }
        const newToken = response.accessToken;

        authService.saveAuthContext(response);

        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${newToken}`;
        return Promise.resolve();
      } catch (error) {
        message.error("Session expired. Please login again.");
        authService.clearAuthContext?.(); // Optional: clear session/token
        window.location.href = "#/auth/signin"; // Redirect to login
        return Promise.reject(error);
      }
    });
  }

  private registerResponseInterceptor(): void {
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";

        message.error(errorMsg);
        return Promise.reject(error);
      }
    );
  }
}
