import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import {defineConfig} from "vitest/config"

export default defineConfig({
  plugins: [react(), tsconfigPaths()] as any[],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["**/__vitest__/**"],
  },
})
