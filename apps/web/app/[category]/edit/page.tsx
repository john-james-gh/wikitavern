import {notFound} from "next/navigation"

import {Tiptap} from "@/components/tip-tap"
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

export default async function EditCategoryPage({params}: Props) {
  const category = await getCategoryBySlug(params)

  if (!category || !category.name) {
    return notFound()
  }

  return (
    <main className="flex flex-col gap-6">
      <h1>Edit Category</h1>
      <p>{category.name}</p>
      <Tiptap content={category.name} />
    </main>
  )
}
