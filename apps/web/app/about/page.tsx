import {sanityFetch} from "@/lib/sanity/live"
import {PAGE_QUERY} from "@/lib/sanity/queries"
import {PortableText} from "next-sanity"
import {components} from "@/lib/sanity/portable-text-components"
import {notFound} from "next/navigation"

export default async function Page() {
  const {data} = await sanityFetch({query: PAGE_QUERY, params: {slug: "about"}})

  if (!data) {
    notFound()
  }

  return (
    <section className="p-2">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      {data?.content && (
        <div>
          <PortableText value={data.content} components={components} />
        </div>
      )}
    </section>
  )
}
