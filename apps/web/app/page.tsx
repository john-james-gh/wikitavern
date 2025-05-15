import type {Metadata} from "next"
import Link from "next/link"

import {client} from "@/lib/sanity/client"
import {FEATURED_PAGES_QUERY, RECENTLY_UPDATED_PAGES_QUERY} from "@/lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: `Home | WikiTavern`,
  }

  return metadata
}

async function getFeaturedPages() {
  return client.fetch(FEATURED_PAGES_QUERY)
}

async function getRecentlyUpdatedPages() {
  return client.fetch(RECENTLY_UPDATED_PAGES_QUERY)
}

export default async function Page() {
  const featuredPagesData = getFeaturedPages()
  const recentlyUpdatedPagesData = getRecentlyUpdatedPages()

  const [featuredPages, recentPages] = await Promise.all([featuredPagesData, recentlyUpdatedPagesData])

  return (
    <main className="prose dark:prose-invert">
      <h1>🏡 Welcome to WikiTavern</h1>
      <p>
        <strong>Wikitavern</strong> is a clean, ad-free, fan-powered wiki platform. Built for contributors who
        care about the stories they tell — without the clutter of ads or corporate ownership.
      </p>

      <h2>🚀 Featured Wikis</h2>
      {featuredPages?.length ? (
        <ul>
          {featuredPages.map((page) => (
            <li key={page._id}>
              <Link href={`/wiki/${page.slug?.current}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No featured wikis yet — check back soon!</p>
      )}

      <h2>📦 Recently Updated</h2>
      {recentPages?.length ? (
        <ul>
          {recentPages.map((page) => (
            <li key={page._id}>
              <Link href={`/wiki/${page.slug?.current}`}>
                {page.title} — updated {new Date(page.updatedAt ?? "").toLocaleDateString()}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent updates yet.</p>
      )}

      <h2>💖 Want to Contribute?</h2>
      <p>
        Help grow the tavern! Add new pages, update existing ones, or share your knowledge with other fans.
        <br />
        Learn how to contribute → (link to About or Contribution Guide)
      </p>
    </main>
  )
}
