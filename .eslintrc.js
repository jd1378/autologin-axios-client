module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
  },
};
