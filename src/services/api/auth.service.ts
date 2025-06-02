// services/ApiService.ts
import { type AxiosInstance } from "axios";
import { StorageService } from "../storage/storage.service";
import { STORAGE_KEYS } from "../../constants/keys.constants";
import {
  ConfirmSignUpDto,
  RefreshTokenDto,
  ResendConfirmationCodeDto,
  SignInDto,
  SignUpDto,
  SignInResponseDto,
  SignUpResponseDto,
  ForgotPasswordDto,
  ConfirmForgotPasswordDto,
  GetMeResponseDto,
} from "./auth.dto";

export class AuthService {
  private http: AxiosInstance;
  private storageService: StorageService;

  constructor(http: AxiosInstance, storageService: StorageService) {
    this.http = http;
    this.storageService = storageService;
  }

  saveAuthContext(params: SignInResponseDto) {
    this.storageService.setItem(STORAGE_KEYS.ACCESS_TOKEN, params.accessToken);
    this.storageService.setItem(
      STORAGE_KEYS.REFRESH_TOKEN,
      params.refreshToken
    );
  }

  clearAuthContext() {
    this.storageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.storageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  getAccessToken() {
    return this.storageService.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return this.storageService.getItem(STORAGE_KEYS.REFRESH_TOKEN);
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

  async forgotPassword(params: ForgotPasswordDto): Promise<boolean> {
    const response = await this.http.post(
      "api/v1/auth/forgot-password",
      params
    );
    return response.data;
  }

  async confirmForgotPassword(params: ConfirmForgotPasswordDto) {
    const response = await this.http.post(
      "api/v1/auth/confirm-forgot-password",
      params
    );
    return response.data;
  }

  async getMe(): Promise<GetMeResponseDto> {
    const response = await this.http.get("api/v1/auth/me");
    return response.data;
  }
}
