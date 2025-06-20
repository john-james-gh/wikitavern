import {type HttpHandler, HttpResponse, http} from "msw"

import {SanityConfig} from "@/config/environment"
import {FEATURED_PAGES_QUERY, RECENTLY_UPDATED_PAGES_QUERY} from "@/lib/sanity/queries"
import type {
  FEATURED_PAGES_QUERYResult,
  PAGE_QUERYResult,
  RECENTLY_UPDATED_PAGES_QUERYResult,
} from "@/types/sanity"

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

const aboutPageMock: PAGE_QUERYResult = {
  _id: "about-page-id",
  title: "ℹ️ About WikiTavern",
  slug: {_type: "slug", current: "about"},
  seo: {
    title: "About | WikiTavern",
    description: "Learn more about WikiTavern, our mission, and our community.",
    image: null,
    noIndex: false,
  },
  content: [
    {
      _type: "block",
      style: "normal",
      _key: "key_91",
      children: [
        {
          _type: "span",
          text: "Welcome to the About page!",
          _key: "key_23",
        },
      ],
    },
  ],
  category: null,
  tags: null,
  publishedAt: null,
  updatedAt: null,
}

const normalizeQueryParam = (s: string | null) => {
  if (!s) return ""
  return decodeURIComponent(s).replace(/\s+/g, " ").trim()
}
const normalizeSlugParam = (s: string | null) => {
  if (!s) return ""
  return decodeURIComponent(s).replace(/^"|"$/g, "").trim()
}

export const handlers: HttpHandler[] = [
  http.get(`https://${SanityConfig.projectId}.apicdn.sanity.io/vX/data/query/:dataset`, ({request}) => {
    const url = new URL(request.url)
    const queryParam = normalizeQueryParam(url.searchParams.get("query"))
    const slugParam = normalizeSlugParam(url.searchParams.get("$slug"))

    if (
      queryParam.includes('_type == "page"') &&
      queryParam.includes("slug.current == $slug") &&
      slugParam === "about"
    ) {
      console.info("[MSW]: Intercepted PAGE_QUERY for about page")
      return HttpResponse.json({result: aboutPageMock})
    }

    if (queryParam === normalizeQueryParam(FEATURED_PAGES_QUERY)) {
      console.info("[MSW]: Intercepted FEATURED_PAGES_QUERY")
      return HttpResponse.json({result: featuredMock})
    }

    if (queryParam === normalizeQueryParam(RECENTLY_UPDATED_PAGES_QUERY)) {
      console.info("[MSW]: Intercepted RECENTLY_UPDATED_PAGES_QUERY")
      return HttpResponse.json({result: recentMock})
    }

    console.info("[MSW]: Intercepted FALLBACK")
    return HttpResponse.json({result: []})
  }),
  http.get("https://enheqlnywwgrpouprkxz.supabase.co/auth/v1/user", () => {
    console.info("[MSW]: Intercepted SUPABASE /auth/v1/user")
    return HttpResponse.json({
      id: "user-123",
      aud: "authenticated",
      role: "authenticated",
      email: "mockuser@example.com",
      email_confirmed_at: "2025-01-01T00:00:00Z",
      phone: "",
      confirmed_at: "2025-01-01T00:00:00Z",
      last_sign_in_at: "2025-05-06T10:00:00Z",
      app_metadata: {
        provider: "email",
      },
      user_metadata: {},
      identities: [],
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-05-06T10:00:00Z",
    })
  }),
  http.get("https://enheqlnywwgrpouprkxz.supabase.co/rest/v1/user_roles", ({request}) => {
    const url = new URL(request.url)
    const select = url.searchParams.get("select")
    const userId = url.searchParams.get("user_id")

    if (select === "role" && userId === "eq.user-123") {
      console.info("[MSW]: Intercepted SUPABASE /auth/v1/user_roles")
      return HttpResponse.json({role: "admin"})
    }

    console.info("[MSW]: Intercepted SUPABASE /auth/v1/user_roles FALLBACK")
    return HttpResponse.json(null)
  }),
]
