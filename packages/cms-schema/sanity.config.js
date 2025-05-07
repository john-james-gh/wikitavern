import {defineConfig} from "sanity"
import {schemaTypes} from "./dist/index.js"
import {baseConfig} from "@workspace/sanity-config/base"

export default defineConfig({
  ...baseConfig,
  schema: {
    types: schemaTypes,
  },
})
