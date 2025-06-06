import { type AxiosInstance } from "axios";
import { StorageService } from "../../storage/storage.service";
import { STORAGE_KEYS } from "../../../constants/keys.constants";
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

/**
 * Service for handling authentication operations
 */
export class AuthService {
  private http: AxiosInstance;
  private storageService: StorageService;

  constructor(http: AxiosInstance, storageService: StorageService) {
    this.http = http;
    this.storageService = storageService;
  }

  /**
   * Saves authentication context to storage
   */
  saveAuthContext(params: SignInResponseDto): void {
    this.storageService.setItem(STORAGE_KEYS.ACCESS_TOKEN, params.accessToken);
    this.storageService.setItem(
      STORAGE_KEYS.REFRESH_TOKEN,
      params.refreshToken
    );
  }

  /**
   * Clears authentication context from storage
   */
  clearAuthContext(): void {
    this.storageService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.storageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Gets the access token from storage
   */
  getAccessToken(): string | null {
    return this.storageService.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Gets the refresh token from storage
   */
  getRefreshToken(): string | null {
    return this.storageService.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Signs in a user with username and password
   */
  async signIn(params: SignInDto): Promise<SignInResponseDto> {
    const response = await this.http.post("api/v1/auth/signin", params);
    return response.data;
  }

  /**
   * Registers a new user
   */
  async signUp(params: SignUpDto): Promise<SignUpResponseDto> {
    const response = await this.http.post("api/v1/auth/signup", params);
    return response.data;
  }

  /**
   * Confirms a user registration with confirmation code
   */
  async confirmSignUp(params: ConfirmSignUpDto): Promise<void> {
    const response = await this.http.post("api/v1/auth/confirm-signup", params);
    return response.data;
  }

  /**
   * Resends a confirmation code to the user
   */
  async resendConfirmationCode(
    params: ResendConfirmationCodeDto
  ): Promise<void> {
    const response = await this.http.post(
      "api/v1/auth/resend-confirmation-code",
      params
    );
    return response.data;
  }

  /**
   * Refreshes the access token using a refresh token
   */
  async refreshToken(params: RefreshTokenDto): Promise<SignInResponseDto> {
    const response = await this.http.post("api/v1/auth/refresh-token", params);
    return response.data;
  }

  /**
   * Initiates a forgot password flow
   */
  async forgotPassword(params: ForgotPasswordDto): Promise<boolean> {
    const response = await this.http.post(
      "api/v1/auth/forgot-password",
      params
    );
    return response.data;
  }

  /**
   * Confirms a new password after forgot password flow
   */
  async confirmForgotPassword(params: ConfirmForgotPasswordDto): Promise<void> {
    const response = await this.http.post(
      "api/v1/auth/confirm-forgot-password",
      params
    );
    return response.data;
  }

  /**
   * Gets the current user information
   */
  async getMe(): Promise<GetMeResponseDto> {
    const response = await this.http.get("api/v1/auth/me");
    return response.data;
  }
}
