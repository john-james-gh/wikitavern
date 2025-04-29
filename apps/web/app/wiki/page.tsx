import {sanityFetch} from "@/lib/sanity/live"
import {PAGES_SLUGS_QUERY} from "@/lib/sanity/queries"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

export default async function AllWikisPage() {
  const {data: pages} = await sanityFetch({query: PAGES_SLUGS_QUERY})

  return (
    <section className="flex flex-col gap-6 my-6">
      <nav className="px-2">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </nav>
      <section className="px-2 prose dark:prose-invert">
        <h1>📚 All Wikis</h1>
        <ul>
          {pages.map((page: {slug: string; title: string; category?: {title: string}}) => (
            <li key={page.slug}>
              <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
