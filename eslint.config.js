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
      // ─── Sonar ────────────────────────────────────────────────────────────
      "sonarjs/todo-tag": "off",
      // Explicit threshold — violations are a signal to extract helpers
      "sonarjs/cognitive-complexity": ["error", 15],

      // ─── TypeScript ───────────────────────────────────────────────────────
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      // Enforce `type` over `interface` everywhere — matches guidelines
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      // Disallow `any` — use `unknown` and narrow instead
      "@typescript-eslint/no-explicit-any": "error",
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
              "^([0-9]+|[0-9]+[a-z]+|[A-Z][a-zA-Z0-9]*|\\.[a-z][a-zA-Z0-9]*|.*[, :*].*|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$",
            match: false
          }
        }
      ],

      // ─── Imports ──────────────────────────────────────────────────────────
      "import/no-duplicates": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      // Enforce conventions that exist only as prose in the guidelines doc.
      // These catch the most common accidental violations during a consistency pass.
      "no-restricted-imports": [
        "error",
        {
          // Block direct icon imports — all icons must come from theme/icons
          patterns: [
            {
              group: ["react-icons/*"],
              message:
                "Import icons via the Icons object from theme/icons — never import icon components directly."
            }
          ],
          paths: [
            // Block useTranslation — use the typed useI18n hook instead
            {
              name: "react-i18next",
              importNames: ["useTranslation"],
              message: "Use the typed useI18n hook instead of useTranslation directly."
            },
            // Block raw useToast — use useI18nToast instead so all messages go through i18n
            {
              name: "@chakra-ui/react",
              importNames: ["useToast"],
              message: "Use useI18nToast instead of useToast directly."
            }
          ]
        }
      ],

      // ─── React ────────────────────────────────────────────────────────────
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

      // ─── JSDoc ────────────────────────────────────────────────────────────
      // Covers: exported function declarations, class methods, AND exported
      // PascalCase arrow functions (= React components & typed hooks).
      // The VariableDeclarator context targets `export const MyComponent = () =>`
      // patterns that the base FunctionDeclaration selector misses entirely.
      "jsdoc/require-jsdoc": [
        "error",
        {
          checkConstructors: false,
          require: {
            FunctionDeclaration: true
          },
          contexts: [
            "MethodDefinition:not([accessibility='private'])",
            // Exported PascalCase const arrow functions — catches React components
            "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/] > ArrowFunctionExpression",
            // Exported default arrow functions (e.g. pages with `export default`)
            "ExportDefaultDeclaration > ArrowFunctionExpression"
          ]
        }
      ],
      "jsdoc/require-param": "error",
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns": "error",
      "jsdoc/require-returns-description": "error",
      "jsdoc/require-example": "off",
      "jsdoc/check-alignment": "off",
      "jsdoc/newline-after-description": "off",

      // ─── General ──────────────────────────────────────────────────────────
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
      "**/apiEndpoints.ts",
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
  },
  // ─── Icons registry — direct react-icons imports are intentional ──────────
  {
    files: ["src/theme/icons/index.ts"],
    rules: {
      "no-restricted-imports": "off"
    }
  }
]);
