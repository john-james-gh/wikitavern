import {defineConfig} from "sanity"
import {schemaTypes} from "./dist/index.js"
import {prodConfig} from "@workspace/sanity-config/prod"
import {baseConfig} from "@workspace/sanity-config/base"

export default defineConfig({
  ...baseConfig,
  ...prodConfig,
  schema: {
    types: schemaTypes,
  },
})
