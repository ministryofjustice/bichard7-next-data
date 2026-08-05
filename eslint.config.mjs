import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import jestPlugin from "eslint-plugin-jest"
import prettierPlugin from "eslint-plugin-prettier"
import globals from "globals"

export default [
  // Global ignores
  {
    ignores: ["output-data/dist/*"]
  },

  // Main TypeScript & Project Config
  {
    files: ["**/*.{js,ts,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      jest: jestPlugin,
      prettier: prettierPlugin
    },
    rules: {
      // TypeScript-recommended baseline rules
      ...tsPlugin.configs.recommended.rules,

      // Your custom overrides
      semi: [2, "never"],
      quotes: [2, "double", { avoidEscape: true }],
      "@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: true }],
      "@typescript-eslint/no-unused-vars": "error",
      "comma-dangle": "off",
      "import/extensions": "off",
      "import/no-relative-packages": "off",
      "import/no-unresolved": "off",
      "no-console": "off",
      "no-empty-function": "off",
      "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
      "no-shadow": "off",
      "no-useless-constructor": "off",
      "prettier/prettier": "error"
    }
  },

  // Disable formatting rules conflicting with Prettier
  eslintConfigPrettier
]
