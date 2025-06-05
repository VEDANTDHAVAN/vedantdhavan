import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**/*',
      'build/**/*',
      'node_modules/**/*',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      '*.config.ts',
      '*.config.tsx',
      '*.min.js',
      '*.bundle.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-empty': 'warn',
      'no-undef': 'error',
      'no-prototype-builtins': 'warn',
      'no-constant-binary-expression': 'warn',
      'no-useless-escape': 'warn',
      'no-case-declarations': 'warn',
      'no-redeclare': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-unsafe-finally': 'warn',
      'no-func-assign': 'warn'
    }
  }
]
