import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/{unit,integration,contract}/**/*.test.ts"],
    passWithNoTests: false,
    testTimeout: 10_000,
    hookTimeout: 30_000,
    clearMocks: true,
  },
});
