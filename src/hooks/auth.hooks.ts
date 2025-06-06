// hooks/useAuth.ts
import { useAtom } from "jotai";
import { accessTokenAtom, refreshTokenAtom } from "../store/auth.state";
import { SignInResponseDto } from "../services/api";

export function useAuth() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const setTokens = (params: SignInResponseDto) => {
    setAccessToken(params.accessToken);
    setRefreshToken(params.refreshToken);
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const signOut = () => {
    clearTokens();
  };

  const isAuthenticated = Boolean(accessToken);

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    setTokens,
    clearTokens,
    signOut,
  };
}
