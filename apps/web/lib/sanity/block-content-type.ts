import {Schema} from "@sanity/schema"
import rawSchema from "@workspace/cms-schema/schema.json"

const compiled = Schema.compile({types: rawSchema})
export const blockContentType = compiled
  .get("page")
  .fields.find((f: {name: string}) => f.name === "content")?.type
