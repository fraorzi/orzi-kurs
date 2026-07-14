import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    include: ["tracks/**/run.test.{js,ts}", "harness/**/*.test.ts"],
    environment: "node",
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@harness": fileURLToPath(new URL("./harness", import.meta.url)),
    },
  },
});
