// services/ApiService.ts
import { type AxiosInstance } from "axios";
import { StorageService } from "../storage/storage.service";
import {
  ConfirmSignUpDto,
  RefreshTokenDto,
  ResendConfirmationCodeDto,
  SignInDto,
  SignUpDto,
  SignInResponseDto,
  SignUpResponseDto,
} from "./auth.dto";

export class AuthService {
  private http: AxiosInstance;
  private storageService: StorageService;

  constructor(http: AxiosInstance, storageService: StorageService) {
    this.http = http;
    this.storageService = storageService;
  }

  saveAuthContext(params: SignInResponseDto) {
    this.storageService.setItem("accessToken", params.accessToken);
    this.storageService.setItem("refreshToken", params.refreshToken);
  }

  clearAuthContext() {
    this.storageService.removeItem("accessToken");
    this.storageService.removeItem("refreshToken");
  }

  getAccessToken() {
    return this.storageService.getItem("accessToken");
  }

  getRefreshToken() {
    return this.storageService.getItem("refreshToken");
  }

  async signIn(params: SignInDto): Promise<SignInResponseDto> {
    const response = await this.http.post("api/v1/auth/signin", params);
    return response.data;
  }

  async signUp(params: SignUpDto): Promise<SignUpResponseDto> {
    const response = await this.http.post("api/v1/auth/signup", params);
    return response.data;
  }

  async confirmSignUp(params: ConfirmSignUpDto) {
    const response = await this.http.post("api/v1/auth/confirm-signup", params);
    return response.data;
  }

  async resendConfirmationCode(params: ResendConfirmationCodeDto) {
    const response = await this.http.post(
      "api/v1/auth/resend-confirmation-code",
      params
    );
    return response.data;
  }

  async refreshToken(params: RefreshTokenDto) {
    const response = await this.http.post("api/v1/auth/refresh-token", params);
    return response.data;
  }
}
