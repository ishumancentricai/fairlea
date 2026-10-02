import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.react-router', 'old-stack']),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: [
      'src/components/ui/**/*.{js,jsx}',
      'src/components/mdx/**/*.{js,jsx}',
      'src/root.jsx',
      'src/routes/**/*.{js,jsx}',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['*.config.js', 'site.config.js', 'scripts/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
])
