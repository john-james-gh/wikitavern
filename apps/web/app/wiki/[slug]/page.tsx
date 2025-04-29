import {sanityFetch} from "@/lib/sanity/live"
import {components} from "@/lib/sanity/portable-text-components"
import {PAGE_QUERY} from "@/lib/sanity/queries"
import {ArrowLeft} from "lucide-react"
import type {Metadata, ResolvingMetadata} from "next"
import {PortableText} from "next-sanity"
import Link from "next/link"
import {notFound} from "next/navigation"

type Props = {
  params: Promise<{slug: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export async function generateMetadata({params}: Props, _parent: ResolvingMetadata): Promise<Metadata> {
  const {slug} = await params

  const {data} = await sanityFetch({
    query: PAGE_QUERY,
    params: {slug},
  })

  if (!data) {
    return {
      title: "Page Not Found | WikiTavern",
      description: "This wiki page could not be found.",
    }
  }

  return {
    title: `${data.title} | WikiTavern`,
    description: data?.content?.[0]?.children?.[0]?.text?.slice(0, 150) ?? "Wikitavern page.",
  }
}

async function Page({params}: Props) {
  const {slug} = await params

  const {data} = await sanityFetch({
    query: PAGE_QUERY,
    params: {slug},
  })

  if (!data) {
    notFound()
  }

  return (
    <section className="flex flex-col gap-6 my-6">
      <nav className="px-2">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </nav>
      <section className="px-2 prose dark:prose-invert">
        <h1>{data.title}</h1>
        {data.content && <PortableText value={data.content} components={components} />}
      </section>
    </section>
  )
}

export default Page
