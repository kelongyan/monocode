import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Pins the UI locale to English; see src/test/setup.ts.
    setupFiles: ["src/test/setup.ts"],
  },
});
