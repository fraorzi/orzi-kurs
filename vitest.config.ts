import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    include: [
      "tracks/**/run.test.{js,jsx,ts,tsx}",
      "harness/**/*.test.{ts,tsx}",
    ],
    environment: "node",
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@harness": fileURLToPath(new URL("./harness", import.meta.url)),
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
