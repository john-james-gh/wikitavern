import {Schema} from "@sanity/schema"
import {schemaTypes} from "@workspace/cms-schema/schema-types"

const compiled = Schema.compile({
  types: schemaTypes,
})

export const blockContentType = compiled
  .get("page")
  .fields.find((f: {name: string}) => f.name === "content").type
