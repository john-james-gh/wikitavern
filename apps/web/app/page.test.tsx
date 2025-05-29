import type {RawQuerylessQueryResponse} from "next-sanity"
import {renderToString} from "react-dom/server"
import {describe, expect, it, vi} from "vitest"

import {client} from "@/lib/sanity/client"

import Page, {generateMetadata} from "./page"

vi.mock("@/lib/sanity/client", () => ({
  client: {fetch: vi.fn()},
}))

describe("generateMetadata()", () => {
  it("returns correct title and base URL", async () => {
    const meta = await generateMetadata()
    expect(meta.title).toBe("Home | WikiTavern")
  })
})

describe.skip("<Page />", () => {
  const featured: RawQuerylessQueryResponse<any> = {
    ms: 0,
    result: [{_id: "1", slug: {current: "foo"}, title: "Foo Page"}],
  }
  const recent: RawQuerylessQueryResponse<any> = {
    ms: 0,
    result: [{_id: "2", slug: {current: "bar"}, title: "Bar Page", updatedAt: "2025-05-01T12:00:00Z"}],
  }

  it("renders featured and recent lists when data exists", async () => {
    // first call → featured, second → recent
    vi.mocked(client.fetch).mockResolvedValueOnce(featured.result).mockResolvedValueOnce(recent.result)

    const html = renderToString(await Page())
    // check your headings
    expect(html).toContain("🏡 Welcome to WikiTavern")
    expect(html).toContain("🚀 Featured Wikis")
    // check that Foo Page and Bar Page show up
    expect(html).toContain("Foo Page")
    expect(html).toContain("Bar Page")
  })

  it("renders fallbacks when lists are empty", async () => {
    const noData: RawQuerylessQueryResponse<any> = {
      ms: 0,
      result: [],
    }
    vi.mocked(client.fetch).mockResolvedValueOnce(noData).mockResolvedValueOnce(noData)

    const html = renderToString(await Page())
    expect(html).toContain("No featured wikis yet")
    expect(html).toContain("No recent updates yet.")
  })
})
