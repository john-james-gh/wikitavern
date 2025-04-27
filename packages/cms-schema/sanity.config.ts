import {defineConfig} from "sanity"
import {schemaTypes} from "./src/schema-types"

export default defineConfig({
  name: "default",
  title: "Wikitavern",

  projectId: "j9ou61ca",
  dataset: "production",

  schema: {
    types: schemaTypes,
  },
})
