import Link from "next/link"
import {notFound} from "next/navigation"

import {client} from "@/lib/sanity/client"
import {CATEGORY_BY_SLUG_QUERY} from "@/lib/sanity/queries"

type Props = {
  params: Promise<{category: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

async function getCategoryBySlug(params: Props["params"]) {
  const slugs = await params
  const data = await client.fetch(CATEGORY_BY_SLUG_QUERY, {slug: slugs.category})
  return data
}

export default async function CategoryIndexPage({params}: Props) {
  const category = await getCategoryBySlug(params)
  const slugs = await params

  if (!category) {
    return notFound()
  }

  return (
    <main>
      <section className="prose dark:prose-invert">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <ul>
          {category.pages.map((page) => (
            <li key={page._id}>
              <Link href={`/${slugs.category}/${page.slug}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
