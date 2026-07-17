import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";
import reactHooks from "eslint-plugin-react-hooks";

const sonarRecommended = sonarjs.configs.recommended;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // Student-facing lint config: the file a student edits (single-file tasks)
  // plus every source file under src/ (multi-file tasks).
  {
    files: [
      "tracks/**/starter.{js,jsx,ts,tsx}",
      "tracks/**/src/**/*.{js,jsx,ts,tsx}",
    ],
    plugins: sonarRecommended.plugins,
    settings: sonarRecommended.settings,
    rules: {
      ...sonarRecommended.rules,
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      complexity: ["warn", 10],
    },
  },

  {
    files: [
      "tracks/react/**/*.{jsx,tsx}",
      "tracks/next/**/*.{jsx,tsx}",
      "tracks/_smoke/05-react-tsx/**/*.{jsx,tsx}",
      "tracks/_smoke/06-next-tsx/**/*.{jsx,tsx}",
    ],
    plugins: reactHooks.configs.flat["recommended-latest"].plugins,
    rules: reactHooks.configs.flat["recommended-latest"].rules,
  },

  // Reference solutions and test files are not student-linted.
  globalIgnores([
    "tracks/**/_solution.*",
    "tracks/**/_solution/**",
    "tracks/**/run.test.*",
  ]),
]);

export default eslintConfig;
