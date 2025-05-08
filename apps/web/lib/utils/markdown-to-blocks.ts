import {TypedObject, htmlToBlocks} from "@portabletext/block-tools"
import {JSDOM} from "jsdom"
import {micromark} from "micromark"

function markdownToBlocks(md: string, blockContentType: any): TypedObject[] {
  const html = micromark(md)
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlString) => new JSDOM(htmlString).window.document,
  })
}

export {markdownToBlocks}
