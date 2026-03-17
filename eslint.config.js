import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';
import pluginImport from 'eslint-plugin-import';
import pluginN from 'eslint-plugin-n';
import prettier from 'eslint-config-prettier';

// Required to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat lets you use legacy configs (like airbnb-base) in flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1. Files/folders to ignore (replaces .eslintignore)
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },

  // 2. Apply airbnb-base via FlatCompat shim
  ...compat.extends('airbnb-base'),

  // 3. Your main config block
  {
    files: ['**/*.js'],
    plugins: {
      import: pluginImport,
      n: pluginN,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'consistent-return': 'off',
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'eslint.config.js', // allow dev imports in ESLint config file
            '**/*.test.js', // allow dev imports in test files
            '**/*.spec.js', // allow dev imports in spec files
          ],
        },
      ],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'], // these are Node.js conventions
        },
      ],
    },
  },

  // 4. Prettier MUST be last — disables conflicting formatting rules
  prettier,
];
