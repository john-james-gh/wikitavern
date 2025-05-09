import Link from "next/link"

import {sanityFetch} from "@/lib/sanity/live"
import {PAGES_SLUGS_QUERY} from "@/lib/sanity/queries"

export default async function AllWikisPage() {
  const {data: pages} = await sanityFetch({query: PAGES_SLUGS_QUERY})

  return (
    <main className="flex flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>📚 All Wikis</h1>
        {pages.length ? (
          <ul>
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No wikis yet — check back soon!</p>
        )}
      </section>
    </main>
  )
}
