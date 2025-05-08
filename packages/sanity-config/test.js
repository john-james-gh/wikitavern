import {defineConfig} from "sanity"

const testConfig = defineConfig({
  name: "test",
  title: "WikiTavern—Test",
  dataset: "test",
  basePath: "/test",
})

export {testConfig}
