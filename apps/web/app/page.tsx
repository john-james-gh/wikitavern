import {sanityFetch} from "@/lib/sanity/live"
import {FEATURED_PAGES_QUERY, RECENTLY_UPDATED_PAGES_QUERY} from "@/lib/sanity/queries"
import Link from "next/link"

export default async function Page() {
  const {data: featuredPages} = await sanityFetch({query: FEATURED_PAGES_QUERY})
  const {data: recentPages} = await sanityFetch({query: RECENTLY_UPDATED_PAGES_QUERY})

  return (
    <section className="px-2 py-4 prose dark:prose-invert">
      <h1>🏡 Welcome to WikiTavern</h1>
      <p>
        <strong>Wikitavern</strong> is a clean, ad-free, fan-powered wiki platform. Built for contributors who
        care about the stories they tell — without the clutter of ads or corporate ownership.
      </p>

      <h2>🚀 Featured Wikis</h2>
      {featuredPages?.length ? (
        <ul>
          {featuredPages.map((page: any) => (
            <li key={page._id}>
              <Link href={`/wiki/${page.slug.current}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No featured wikis yet — check back soon!</p>
      )}

      <h2>📦 Recently Updated</h2>
      {recentPages?.length ? (
        <ul>
          {recentPages.map((page: any) => (
            <li key={page._id}>
              <Link href={`/wiki/${page.slug.current}`}>
                {page.title} — updated {new Date(page.updatedAt).toLocaleDateString()}
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
    </section>
  )
}
