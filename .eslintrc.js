module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }]
  }
}
