import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia for Ant Design components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// You can add other global setup here if needed in the future.
// For example, mocking localStorage or other browser APIs:
//
// const localStorageMock = (() => {
//   let store: Record<string, string> = {};
//   return {
//     getItem: (key: string): string | null => store[key] || null,
//     setItem: (key: string, value: string): void => {
//       store[key] = value.toString();
//     },
//     removeItem: (key: string): void => {
//       delete store[key];
//     },
//     clear: (): void => {
//       store = {};
//     },
//     get length(): number {
//       return Object.keys(store).length;
//     },
//     key: (index: number): string | null => {
//       const keys = Object.keys(store);
//       return keys[index] || null;
//     }
//   };
// })();
//
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Clear mocks, reset localStorage, etc. before each test if needed
// beforeEach(() => {
//   localStorage.clear();
// vi.clearAllMocks(); // If using vi.spyOn or vi.fn extensively and need reset
// });
