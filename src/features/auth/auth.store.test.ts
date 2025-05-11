import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAuthTokens, setAuthTokens, clearAuthTokens } from './auth.store';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string): string | null => store[key] || null),
    setItem: vi.fn((key: string, value: string): void => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string): void => {
      delete store[key];
    }),
    clear: vi.fn((): void => {
      store = {};
    }),
  };
})();

// Replace global localStorage with our mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('auth.store', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getAuthTokens', () => {
    it('returns empty tokens when localStorage is empty', () => {
      const tokens = getAuthTokens();
      expect(tokens).toEqual({ accessToken: null, refreshToken: null });
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authTokens');
    });

    it('returns tokens from localStorage', () => {
      const mockTokens = { accessToken: 'test-access-token', refreshToken: 'test-refresh-token' };
      localStorageMock.setItem('authTokens', JSON.stringify(mockTokens));

      const tokens = getAuthTokens();
      expect(tokens).toEqual(mockTokens);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authTokens');
    });

    it('handles invalid JSON gracefully', () => {
      localStorageMock.setItem('authTokens', 'invalid-json');

      const tokens = getAuthTokens();
      expect(tokens).toEqual({ accessToken: null, refreshToken: null });
      expect(localStorageMock.getItem).toHaveBeenCalledWith('authTokens');
    });

    it('validates token types from localStorage', () => {
      const invalidTokens = { accessToken: 123, refreshToken: true };
      localStorageMock.setItem('authTokens', JSON.stringify(invalidTokens));

      const tokens = getAuthTokens();
      expect(tokens).toEqual({ accessToken: null, refreshToken: null });
    });
  });

  describe('setAuthTokens', () => {
    it('saves tokens to localStorage', () => {
      const mockTokens = { accessToken: 'new-access-token', refreshToken: 'new-refresh-token' };

      setAuthTokens(mockTokens);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authTokens',
        JSON.stringify(mockTokens)
      );
    });

    it('overwrites existing tokens', () => {
      // Set initial tokens
      localStorageMock.setItem(
        'authTokens',
        JSON.stringify({ accessToken: 'old-token', refreshToken: 'old-refresh' })
      );

      // Set new tokens
      const newTokens = { accessToken: 'new-token', refreshToken: 'new-refresh' };
      setAuthTokens(newTokens);

      // Verify localStorage was updated
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authTokens',
        JSON.stringify(newTokens)
      );
    });
  });

  describe('clearAuthTokens', () => {
    it('removes tokens from localStorage', () => {
      // Set some tokens first
      localStorageMock.setItem(
        'authTokens',
        JSON.stringify({ accessToken: 'token', refreshToken: 'refresh' })
      );

      clearAuthTokens();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authTokens');
    });
  });
});
