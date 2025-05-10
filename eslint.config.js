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

  // 1. Base JS/TS recommended rules for ALL .js, .ts files
  // (including eslint.config.js, vite.config.ts)
  // This block does NOT use parserOptions.project
  {
    files: ['**/*.{js,ts,mjs,mts,cjs,cts}'],
    // Using spread for extends is not directly supported here, apply them as separate configs if needed
    // For simplicity, applying recommended and then ts-recommended as separate top-level configs might be better
    // Or, define this block after the global eslintJs.configs.recommended and tseslint.configs.recommended
    // and let them apply globally, then this block just sets languageOptions for config files.
    // Let's try a simpler global application first, then refine if needed.
  },
  eslintJs.configs.recommended, // Applied globally
  ...tseslint.configs.recommended, // Applied globally (non-type-aware part)

  // Specific configuration for config files (vite.config.ts, eslint.config.js)
  // to ensure they use Node globals and are not processed with src parserOptions.project
  {
    files: ['vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    // No parserOptions.project here
  },

  // 2. Type-aware linting ONLY for 'src' directory
  {
    files: ['src/**/*.{ts,tsx}'], // Target only application source files
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser, // 'src' code is usually browser-bound
      },
    },
    // Add type-aware rules here if needed, or rely on extended type-checked configs
    // e.g. by spreading ...tseslint.configs.recommendedTypeChecked.rules here
  },

  // 3. React specific configuration
  {
    files: ['src/**/*.{ts,tsx,jsx}'], // Target React files within src
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
    // languageOptions for globals here would be inherited if this block also matches files in block 2
    // Explicitly setting browser globals for React components if not already covered
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  eslintConfigPrettier // Apply Prettier last
);
