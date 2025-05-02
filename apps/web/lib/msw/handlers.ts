import {http, HttpResponse, type HttpHandler} from "msw"
import {FEATURED_PAGES_QUERY, RECENTLY_UPDATED_PAGES_QUERY} from "@/lib/sanity/queries"
import {SANITY_PROJECT_ID} from "@/config/environment"
import type {FEATURED_PAGES_QUERYResult, RECENTLY_UPDATED_PAGES_QUERYResult} from "@/types/sanity"
import {globalMockState} from "./global-mock-state"

const featuredMock: FEATURED_PAGES_QUERYResult = [
  {
    _id: "page-1",
    title: "Mocked Featured Page 1",
    slug: {_type: "slug", current: "mocked-featured-1"},
    updatedAt: "2025-05-02T12:00:00Z",
  },
  {
    _id: "page-2",
    title: "Mocked Featured Page 2",
    slug: {_type: "slug", current: "mocked-featured-2"},
    updatedAt: "2025-05-01T08:30:00Z",
  },
  {
    _id: "page-3",
    title: "Mocked Featured Page 3",
    slug: {_type: "slug", current: "mocked-featured-3"},
    updatedAt: "2025-02-01T08:30:00Z",
  },
]

const recentMock: RECENTLY_UPDATED_PAGES_QUERYResult = [
  {
    _id: "page-3",
    title: "Mocked Recent Page 1",
    slug: {_type: "slug", current: "mocked-recent-1"},
    updatedAt: "2025-05-03T09:15:00Z",
  },
]

const normalize = (s: string) => decodeURIComponent(s).replace(/\s+/g, " ").trim()

export const handlers: HttpHandler[] = [
  http.get(`https://${SANITY_PROJECT_ID}.apicdn.sanity.io/vX/data/query/:dataset`, ({request}) => {
    const url = new URL(request.url)
    const raw = url.searchParams.get("query") || ""
    const q = normalize(raw)

    if (q === normalize(FEATURED_PAGES_QUERY)) {
      console.info("[MSW]: Intercepted FEATURED_PAGES_QUERY")
      return HttpResponse.json({result: globalMockState.featuredOverride ?? featuredMock})
    }

    if (q === normalize(RECENTLY_UPDATED_PAGES_QUERY)) {
      console.info("[MSW]: Intercepted RECENTLY_UPDATED_PAGES_QUERY")
      return HttpResponse.json({result: globalMockState.recentOverride ?? recentMock})
    }

    console.info("[MSW]: Intercepted FALLBACK")
    return HttpResponse.json({result: []})
  }),
]
