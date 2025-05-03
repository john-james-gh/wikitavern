import {defineConfig} from "vitest/config"

export default defineConfig({
  test: {
    workspace: ["apps/web"],
    coverage: {
      provider: "v8",
      include: ["apps/web/**/*.{ts,tsx}"],
    },
  },
})
