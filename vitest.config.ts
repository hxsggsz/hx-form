import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "istanbul",
      },
      setupFiles: ["src/vitest.setup.ts"],
      include: ["src/__tests__/*.spec.ts", "src/__tests__/*.spec.tsx"],
    },
  })
);
