import {describe, it, expect, vi} from "vitest"
import {renderToString} from "react-dom/server"
import Page, {generateMetadata} from "./page"
import {sanityFetch} from "@/lib/sanity/live"

vi.mock("@/lib/sanity/live", () => ({
  sanityFetch: vi.fn(),
}))

describe("generateMetadata()", () => {
  it("returns correct title and base URL", async () => {
    const meta = await generateMetadata()
    expect(meta.title).toBe("Home | WikiTavern")
  })
})

describe("<Page />", () => {
  const featured = [{_id: "1", slug: {current: "foo"}, title: "Foo Page"}]
  const recent = [{_id: "2", slug: {current: "bar"}, title: "Bar Page", updatedAt: "2025-05-01T12:00:00Z"}]
  const noData: any[] = []

  it("renders featured and recent lists when data exists", async () => {
    // first call → featured, second → recent
    vi.mocked(sanityFetch)
      .mockResolvedValueOnce({data: featured, sourceMap: null, tags: []})
      .mockResolvedValueOnce({data: recent, sourceMap: null, tags: []})

    const html = renderToString(await Page())
    // check your headings
    expect(html).toContain("🏡 Welcome to WikiTavern")
    expect(html).toContain("🚀 Featured Wikis")
    // check that Foo Page and Bar Page show up
    expect(html).toContain("Foo Page")
    expect(html).toContain("Bar Page")
  })

  it("renders fallbacks when lists are empty", async () => {
    vi.mocked(sanityFetch)
      .mockResolvedValueOnce({data: noData, sourceMap: null, tags: []})
      .mockResolvedValueOnce({data: noData, sourceMap: null, tags: []})

    const html = renderToString(await Page())
    expect(html).toContain("No featured wikis yet")
    expect(html).toContain("No recent updates yet.")
  })
})
