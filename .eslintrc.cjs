/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsonc/recommended-with-json',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  overrides: [
    // {
    //   files: '*.vue',
    //   rules: {
    //     'import/default': 'off',
    //     'import/namespace': 'off',
    //     'import/no-named-as-default': 'off',
    //     'import/no-named-as-default-member': 'off',
    //   },
    // },
    {
      files: ['src/**', 'index.js'],
      rules: {
        'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { natural: true }],
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'jsonc',
    'import',
    'simple-import-sort',
    // 'sort-destructure-keys',
    'sort-keys-fix',
  ],
  root: true,
  rules: {
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'parent', 'sibling', 'type'],
        'newlines-between': 'always',
        'pathGroups': [
          { group: 'parent', pattern: '@/**', position: 'before' },
        ],
        'pathGroupsExcludedImportTypes': ['type'],
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'off',
    // 'sort-destructure-keys/sort-destructure-keys': 'warn',
    'vue/v-on-event-hyphenation': [
      'warn',
      'always',
      {
        autofix: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/external-module-folders': ['.yarn', 'node_modules'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          __dirname + '/tsconfig.json',
          __dirname + '/tsconfig.config.json',
        ],
      },
      node: true,
    },
  },
};
