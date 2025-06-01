// services/ApiService.ts
import { type AxiosInstance } from "axios";
import {
  ConfirmSignUpDto,
  RefreshTokenDto,
  ResendConfirmationCodeDto,
  SignInDto,
  SignUpDto,
  SignInResponseDto,
} from "./auth.dto";

export class AuthService {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async signIn(params: SignInDto): Promise<SignInResponseDto> {
    const response = await this.http.post("api/v1/auth/signin", params);
    return response.data;
  }

  async signUp(params: SignUpDto) {
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
