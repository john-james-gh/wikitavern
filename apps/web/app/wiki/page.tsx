import Link from "next/link"

import {client} from "@/lib/sanity/client"
import {PAGES_SLUGS_QUERY} from "@/lib/sanity/queries"

export default async function AllWikisPage() {
  const pages = await client.fetch(PAGES_SLUGS_QUERY)

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
