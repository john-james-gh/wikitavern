import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "@workspace/cms-schema/schema-types"
import {config} from "@workspace/sanity-config/base"

export default defineConfig({
  ...config,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
