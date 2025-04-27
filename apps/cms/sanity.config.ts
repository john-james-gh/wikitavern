import {defineConfig} from "sanity"
import type {SchemaTypeDefinition} from "sanity"
import {structureTool} from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "@workspace/cms-schema/schema-types"

export default defineConfig({
  name: "default",
  title: "Wikitavern",

  projectId: "j9ou61ca",
  dataset: "production",

  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
})
