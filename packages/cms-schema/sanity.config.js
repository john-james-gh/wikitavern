import {defineConfig} from "sanity"
import {schemaTypes} from "./dist/index.js"
import {config} from "@workspace/sanity-config/base"

export default defineConfig({
  ...config,
  schema: {
    types: schemaTypes,
  },
})
