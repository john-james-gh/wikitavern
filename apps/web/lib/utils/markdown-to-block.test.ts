import type {TypedObject} from "@portabletext/block-tools"
import {describe, expect, it} from "vitest"

import {blockContentType} from "@/lib/sanity/block-content-type"

import {markdownToBlocks} from "./markdown-to-blocks"

interface Block extends TypedObject {
  _type: "block"
  style?: string
  children: Array<{
    _type: "span"
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: "link"
    href: string
  }>
  listItem?: string
}

describe("markdownToBlocks", () => {
  it("should convert basic markdown to blocks", () => {
    const markdown = "# Hello World"
    const result = markdownToBlocks(markdown, blockContentType) as Block[]

    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      _type: "block",
      style: "h1",
      children: [
        {
          _type: "span",
          text: "Hello World",
        },
      ],
    })
  })

  it("should handle multiple paragraphs", () => {
    const markdown = "First paragraph\n\nSecond paragraph"
    const result = markdownToBlocks(markdown, blockContentType) as Block[]

    expect(result).toHaveLength(2)
    expect(result[0]!.children[0]!.text).toBe("First paragraph")
    expect(result[1]!.children[0]!.text).toBe("Second paragraph")
  })

  it("should handle markdown with links", () => {
    const markdown = "[Link text](https://example.com)"
    const result = markdownToBlocks(markdown, blockContentType) as Block[]

    expect(result).toHaveLength(1)
    expect(result[0]!.children[0]).toMatchObject({
      _type: "span",
      text: "Link text",
    })
    expect(result[0]!.children[0]!.marks).toHaveLength(1)
    expect(result[0]!.markDefs).toHaveLength(1)
    expect(result[0]!.markDefs![0]).toMatchObject({
      _type: "link",
      href: "https://example.com",
    })
  })

  it("should handle markdown with lists", () => {
    const markdown = "- Item 1\n- Item 2"
    const result = markdownToBlocks(markdown, blockContentType) as Block[]

    expect(result).toHaveLength(2)
    expect(result[0]!).toMatchObject({
      _type: "block",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Item 1",
        },
      ],
    })
    expect(result[1]!).toMatchObject({
      _type: "block",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Item 2",
        },
      ],
    })
  })

  it("should handle empty markdown", () => {
    const result = markdownToBlocks("", blockContentType)
    expect(result).toHaveLength(0)
  })
})
