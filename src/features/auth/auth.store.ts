import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

/**
 * TSDoc: Defines the structure for authentication tokens.
 */
export type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

/**
 * TSDoc: Defines the structure for the user object.
 * This should be updated to match the actual user data structure from your API.
 * For now, it includes minimal common fields.
 */
export type User = {
  id: string; // Or number, depending on your API's user ID type
  email: string;
  username: string; // Assuming username is distinct from email and used for login/identification
  // Add other user properties as returned by /api/v1/auth/me or similar endpoint
  // For example: roles?: string[]; permissions?: string[];
} | null;

// Uses localStorage for persisting tokens.
const tokenStorage = createJSONStorage<AuthTokens>(() => localStorage);

/**
 * TSDoc: Atom to store authentication tokens (accessToken, refreshToken).
 * Persisted in localStorage.
 */
export const authTokensAtom = atomWithStorage<AuthTokens>(
  'authTokens', // Key used in localStorage
  {
    accessToken: null,
    refreshToken: null,
  },
  tokenStorage
);

/**
 * TSDoc: Atom to store the authenticated user's data.
 * Initialized to null, indicating no user is logged in.
 * This atom is not persisted directly; it's typically populated after a successful login
 * or when the app initializes by fetching user data using a valid token.
 */
export const authUserAtom = atom<User>(null);

/**
 * TSDoc: Retrieves the current authentication tokens directly from localStorage.
 * This is a utility function to be used by the apiService interceptor or other parts
 * of the application that need synchronous access to tokens before Jotai context might be available.
 * @returns {AuthTokens} The current access and refresh tokens.
 */
export const getAuthTokens = (): AuthTokens => {
  const tokensString = localStorage.getItem('authTokens'); // Matches key used in atomWithStorage
  if (tokensString) {
    try {
      // Ensure the parsed object conforms to AuthTokens type
      const parsed = JSON.parse(tokensString);
      return {
        accessToken: typeof parsed.accessToken === 'string' ? parsed.accessToken : null,
        refreshToken: typeof parsed.refreshToken === 'string' ? parsed.refreshToken : null,
      };
    } catch (error) {
      console.error('Error parsing auth tokens from localStorage:', error);
      // Return default empty tokens if parsing fails
      return { accessToken: null, refreshToken: null };
    }
  }
  return { accessToken: null, refreshToken: null };
};

/**
 * TSDoc: Sets the authentication tokens directly in localStorage.
 * This utility function is primarily for use by the apiService interceptor after a token refresh.
 * It also updates the Jotai atom to ensure UI reactivity.
 * Note: Direct manipulation of localStorage should be cautious. Prefer Jotai setters where possible.
 * @param {AuthTokens} tokens - The access and refresh tokens to set.
 */
export const setAuthTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('authTokens', JSON.stringify(tokens));
};

/**
 * TSDoc: Clears the authentication tokens from localStorage.
 * This utility function is for use by the apiService or logout logic.
 * It also implies that the Jotai atom for user should be reset.
 */
export const clearAuthTokens = (): void => {
  localStorage.removeItem('authTokens');
};
