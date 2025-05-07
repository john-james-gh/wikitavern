import {defineConfig} from "sanity"

const prodConfig = defineConfig({
  name: "production",
  title: "WikiTavern—Production",
  dataset: "production",
  basePath: "/prod",
})

export {prodConfig}
