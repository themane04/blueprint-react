import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      jsdoc,
      import: importPlugin
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      sonarjs.configs.recommended
    ],
    rules: {
      "sonarjs/todo-tag": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "class",
          format: ["PascalCase"]
        },
        {
          selector: "interface",
          format: ["PascalCase"]
        },
        {
          selector: "method",
          format: ["camelCase"]
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow"
        },
        {
          selector: "property",
          format: ["camelCase", "snake_case"],
          leadingUnderscore: "allow",
          filter: {
            regex:
              "^([0-9]+|[0-9]+[a-z]+|[A-Z][a-zA-Z0-9]*|\\.[a-z][a-zA-Z0-9]*|.*[, :*].*)$",
            match: false
          }
        }
      ],
      "import/no-duplicates": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "react/jsx-key": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react-hooks/exhaustive-deps": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function"
        }
      ],
      "jsdoc/require-jsdoc": [
        "error",
        {
          checkConstructors: false,
          require: {
            FunctionDeclaration: true
          },
          contexts: ["MethodDefinition:not([accessibility='private'])"]
        }
      ],
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-example": "off",
      "jsdoc/check-alignment": "off",
      "jsdoc/newline-after-description": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "comma-dangle": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "space-before-blocks": ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      semi: ["error", "always"]
    }
  },
  {
    files: [
      "**/constants.ts",
      "**/paths.ts",
      "**/endpoints.ts",
      "**/backendMessageMap.ts"
    ],
    rules: {
      "sonarjs/no-hardcoded-passwords": "off"
    }
  },
  {
    files: ["src/services/**/*.{ts,tsx}", "src/utils/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"]
      }
    },
    extends: [...tseslint.configs.recommendedTypeChecked],
    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/consistent-type-imports": "error"
    }
  }
]);
