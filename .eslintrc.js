module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "jest", "prettier"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "no-empty-function": "off",
    "no-useless-constructor": "off",
    "prettier/prettier": "error"
  }
}
