import {Schema} from "@sanity/schema"
import rawSchema from "../../schema.json"

const compiled = Schema.compile({types: rawSchema})
const pageType = compiled.get("page")
const contentDef = pageType.fields.find((f: any) => f.name === "content")!
export const blockContentType = contentDef.type
