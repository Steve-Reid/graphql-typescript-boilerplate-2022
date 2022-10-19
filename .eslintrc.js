module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['prettier'],
  rules: {
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: false
      }
    ],
    'consistent-return': 0,
    'global-require': 0,
    'no-var': 0,
    'prefer-destructuring': 0,
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/self-closing-comp': ['error'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '(^_[a-z]|^_)',
        argsIgnorePattern: '(^_[a-z]|^_)'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '(^_[a-z]|^_)',
        argsIgnorePattern: '(^_[a-z]|^_)'
      }
    ],
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {}
    }
  }
};
