import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "@workspace/cms-schema/schema-types"
import {prodConfig} from "@workspace/sanity-config/prod"
import {testConfig} from "@workspace/sanity-config/test"
import {baseConfig} from "@workspace/sanity-config/base"

const withPlugIns = defineConfig({
  ...baseConfig,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

export default defineConfig([
  {
    ...withPlugIns,
    ...prodConfig,
  },
  {
    ...withPlugIns,
    ...testConfig,
  },
])
