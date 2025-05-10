import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    // Global ignores. Add project specific ignores if any.
    ignores: [
      'dist/',
      'node_modules/',
      '.DS_Store',
      '*.log',
      'coverage/',
      'vite.config.ts.timestamp-*',
    ],
  },
  eslintJs.configs.recommended, // Base ESLint recommended rules
  ...tseslint.configs.recommended, // TypeScript-specific recommended rules
  // For more comprehensive type-aware linting (requires project setup in parserOptions):
  // Replace `...tseslint.configs.recommended` with `...tseslint.configs.recommendedTypeChecked` or `...tseslint.configs.strictTypeChecked`
  // And add/uncomment below:
  // {
  //   files: ["**/*.{ts,tsx,js,jsx}"], // Apply to all relevant files
  //   languageOptions: {
  //     parserOptions: {
  //       project: true, // This will automatically find tsconfig.json
  //       tsconfigRootDir: import.meta.dirname, // Ensures tsconfig.json is resolved relative to eslint.config.js
  //     },
  //   },
  // },

  {
    files: ['**/*.{ts,tsx,jsx}'], // Apply React-specific configurations only to these file types
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      // React recommended rules
      ...eslintPluginReact.configs.recommended.rules,
      // New JSX transform rules (React 17+)
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      // React Hooks rules
      ...eslintPluginReactHooks.configs.recommended.rules,
      // Rule for React Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Useful for Vite/React Router where page components might be const exports
      ],
      // TypeScript handles prop types, so turn off the React prop-types rule
      'react/prop-types': 'off',
      // React 17+ new JSX transform doesn't require React in scope
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Define browser global variables
      },
    },
  },
  // Prettier configuration must be the last in the array to override other styling rules
  eslintConfigPrettier,
  {
    // Global language options, applicable to all files unless overridden
    languageOptions: {
      globals: {
        ...globals.browser, // Standard browser environment globals
        ...globals.es2020, // ES2020 globals, aligning with your tsconfig.app.json target
        ...globals.node, // Node.js globals for config files (like this one, vite.config.ts, etc.) and scripts
      },
    },
  }
);
