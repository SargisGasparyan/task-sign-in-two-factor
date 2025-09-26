import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all', // проверяем все переменные
          args: 'after-used', // аргументы функций проверяем, если не используются
          ignoreRestSiblings: true, // игнорируем оставшиеся свойства при деструктуризации
        },
      ],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JS
      'no-console': 'warn',
      'no-empty': 'warn',
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
