/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:jsonc/recommended-with-json',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['sort-keys-fix', 'jsonc'],
  root: true,
  rules: {
    'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { natural: true }],
  },
};
