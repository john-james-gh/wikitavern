import {toHTML} from "@portabletext/to-html"
import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {Article, WithContext} from "schema-dts"

import {Tiptap} from "@/components/tip-tap"
import {client} from "@/lib/sanity/client"
import {PAGE_BY_SLUG_QUERY} from "@/lib/sanity/queries"

type Props = {
  params: Promise<{category: string; wiki: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

const getPage = async (params: Props["params"]) => {
  const {category, wiki} = await params
  return client.fetch(PAGE_BY_SLUG_QUERY, {category, wiki})
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
  }

  if (data.seo.noIndex) {
    metadata.robots = "noindex"
  }

  return metadata
}

async function Page({params}: Props) {
  const data = await getPage(params)

  if (!data || !data.content) {
    notFound()
  }

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: data.seo.title,
    description: data.seo.description,
  }

  const html = toHTML(data.content)

  return (
    <main className="flex flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>{data.title}</h1>
        <Tiptap content={html} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}

export default Page
