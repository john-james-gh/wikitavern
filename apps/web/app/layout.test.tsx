import RootLayout, {metadata} from "./layout"
import React from "react"
import {renderToString} from "react-dom/server"
import {beforeEach, describe, expect, it, vi} from "vitest"

import {createClient} from "@/lib/supabase/server"

// mock fonts
vi.mock("next/font/google", () => ({
  Geist: () => ({variable: "--font-sans"}),
  Geist_Mono: () => ({variable: "--font-mono"}),
}))

// mock components & supabase
vi.mock("@/components/providers", () => ({
  Providers: ({children}: any) => <div data-testid="providers">{children}</div>,
}))
vi.mock("@/components/app-sidebar", () => ({
  AppSidebar: (props: any) => <div data-testid="sidebar">{JSON.stringify(props)}</div>,
}))
vi.mock("@/components/header", () => ({
  Header: (props: any) => <div data-testid="header">{JSON.stringify(props)}</div>,
}))
vi.mock("@/lib/sanity/live", () => ({
  SanityLive: () => <div data-testid="sanity-live" />,
}))
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}))

describe("RootLayout & metadata", () => {
  const fakeClient = {
    auth: {getUser: vi.fn()},
    from: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(fakeClient)
  })

  it("exports correct metadata", () => {
    expect(metadata.title).toBe("WikiTavern")
    expect(metadata.metadataBase.toString()).toMatch(/localhost:3000|vercel\.app/)
  })

  it("renders layout when no user is signed in", async () => {
    fakeClient.auth.getUser.mockResolvedValue({data: {user: null}})
    fakeClient.from.mockResolvedValue({data: {}, error: null})

    const html = renderToString(await RootLayout({children: <p>Test Child</p>}))

    expect(html).toContain('data-testid="providers"')
    expect(html).toContain('data-testid="sidebar"')
    expect(html).toContain('data-testid="header"')
    expect(html).toContain("<p>Test Child</p>")
    expect(html).toContain('data-testid="sanity-live"')
  })

  it("renders layout with user and role", async () => {
    const user = {id: "u123", email: "me@example.com"}
    fakeClient.auth.getUser.mockResolvedValue({data: {user}})

    // mock .from(...).select(...).eq(...).single() → role = "admin"
    fakeClient.from.mockReturnValue({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({data: {role: "admin"}, error: null}),
        }),
      }),
    })

    const raw = renderToString(await RootLayout({children: <div>Member Area</div>}))

    // unescape the JSON blobs
    const html = raw.replace(/&quot;/g, '"')

    expect(html).toContain('"user":{"id":"u123","email":"me@example.com"}')
    expect(html).toContain('"userRole":"admin"')
    expect(html).toContain("Member Area")
    expect(html).toContain('data-testid="sanity-live"')
  })
})
