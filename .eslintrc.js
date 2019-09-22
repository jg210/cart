module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',  // from @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    project: "./tsconfig.json"
  },
  rules:  {
    "@typescript-eslint/explicit-function-return-type": 2,
    "semi": 2
  }
};
