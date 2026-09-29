import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'migrations/**',
        ],
    },

    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: {
            js,
            '@typescript-eslint': tseslint.plugin,
        },
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.node,
        },
    },

    tseslint.configs.recommended,

    {
        rules: {
            // Unused variables
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',

            // Formatting
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', { before: false, after: true }],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-blocks': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],

            // General style
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
]);