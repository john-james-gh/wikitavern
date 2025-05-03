import {sanityFetch} from "@/lib/sanity/live"
import {PAGE_QUERY} from "@/lib/sanity/queries"
import {PortableText} from "next-sanity"
import {components} from "@/lib/sanity/portable-text-components"
import {notFound} from "next/navigation"
import type {Metadata} from "next"

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: `About | WikiTavern`,
    metadataBase: new URL("https://acme.com"),
  }

  return metadata
}

export default async function Page() {
  const {data} = await sanityFetch({query: PAGE_QUERY, params: {slug: "about"}})

  if (!data) {
    notFound()
  }

  return (
    <section className="px-2 py-4 prose dark:prose-invert">
      <h1>{data.title}</h1>
      {data?.content && <PortableText value={data.content} components={components} />}
    </section>
  )
}
