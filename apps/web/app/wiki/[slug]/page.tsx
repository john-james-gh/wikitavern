import type {Metadata} from "next"
import {PortableText} from "next-sanity"
import {notFound} from "next/navigation"
import {Article, WithContext} from "schema-dts"

import {client} from "@/lib/sanity/client"
import {components} from "@/lib/sanity/portable-text-components"
import {PAGE_QUERY} from "@/lib/sanity/queries"

type Props = {
  params: Promise<{slug: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

const getPage = async (params: Props["params"]) => {
  const slug = await params
  return client.fetch(PAGE_QUERY, {slug})
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const data = await getPage(params)

  if (!data) {
    return {
      title: "Page Not Found | WikiTavern",
      description: "This wiki page could not be found.",
    }
  }

  const metadata: Metadata = {
    title: `${data.seo.title} | WikiTavern`,
    description: data.seo.description,
    metadataBase: new URL("https://acme.com"),
  }

  if (data.seo.noIndex) {
    metadata.robots = "noindex"
  }

  return metadata
}

async function Page({params}: Props) {
  const data = await getPage(params)

  if (!data) {
    notFound()
  }

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: data.seo.title,
    description: data.seo.description,
  }

  return (
    <main className="flex flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>{data.title}</h1>
        {data.content && <PortableText value={data.content} components={components} />}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}

export default Page
