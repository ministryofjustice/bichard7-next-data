module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": "off"
  }
}
