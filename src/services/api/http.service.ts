import axios, { type AxiosInstance } from "axios";
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

  registerRequestInterceptor(): void {
    this.http.interceptors.request.use((config) => {
      // Get token from auth service instead of localStorage directly
      const token = authService.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  registerResponseInterceptor(): void {
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        // Extract message from response or use fallback
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";

        // Display error using Ant Design message
        message.error(errorMsg);

        // Re-throw error so that calling code can still handle it if needed
        return Promise.reject(error);
      }
    );
  }
}
