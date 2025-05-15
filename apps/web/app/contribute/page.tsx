import {PortableText} from "next-sanity"
import {notFound} from "next/navigation"

import {client} from "@/lib/sanity/client"
import {components} from "@/lib/sanity/portable-text-components"
import {PAGE_QUERY} from "@/lib/sanity/queries"

export default async function Page() {
  const data = await client.fetch(PAGE_QUERY, {slug: "contribute"})

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
