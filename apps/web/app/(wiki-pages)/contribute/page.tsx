import {sanityFetch} from "@/lib/sanity/live"
import {PAGE_QUERY} from "@/lib/sanity/queries"
import {PortableText} from "next-sanity"
import {components} from "@/lib/sanity/portable-text-components"
import {notFound} from "next/navigation"

export default async function Page() {
  const {data} = await sanityFetch({query: PAGE_QUERY, params: {slug: "contribute"}})

  if (!data) {
    notFound()
  }

  return (
    <main className="prose dark:prose-invert">
      <h1>{data.title}</h1>
      {data?.content && <PortableText value={data.content} components={components} />}
    </main>
  )
}
