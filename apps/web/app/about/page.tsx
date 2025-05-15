import type {Metadata} from "next"
import {PortableText} from "next-sanity"
import {notFound} from "next/navigation"

import {client} from "@/lib/sanity/client"
import {components} from "@/lib/sanity/portable-text-components"
import {PAGE_QUERY} from "@/lib/sanity/queries"

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: `About | WikiTavern`,
  }

  return metadata
}

export default async function Page() {
  const data = await client.fetch(PAGE_QUERY, {slug: "about"})

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
