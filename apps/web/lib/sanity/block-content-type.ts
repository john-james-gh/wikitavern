import {Schema} from "@sanity/schema"
import rawSchema from "../../schema.json"

const compiled = Schema.compile({types: rawSchema})
export const blockContentType = compiled.get("page").fields.find((f: any) => f.name === "content").type
