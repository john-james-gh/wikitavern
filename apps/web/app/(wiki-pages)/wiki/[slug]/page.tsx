import {sanityFetch} from "@/lib/sanity/live"
import {components} from "@/lib/sanity/portable-text-components"
import {PAGE_QUERY} from "@/lib/sanity/queries"
import {ArrowLeft} from "lucide-react"
import type {Metadata} from "next"
import {PortableText} from "next-sanity"
import Link from "next/link"
import {notFound} from "next/navigation"
import {Article, WithContext} from "schema-dts"

type Props = {
  params: Promise<{slug: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

const getPage = async (params: Props["params"]) => {
  const {data} = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  })
  return data
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
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </nav>

      <section className="prose dark:prose-invert">
        <h1>{data.title}</h1>
        {data.content && <PortableText value={data.content} components={components} />}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}

export default Page
