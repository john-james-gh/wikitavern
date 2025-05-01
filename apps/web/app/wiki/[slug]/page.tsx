import {urlFor} from "@/lib/sanity/image"
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

const getPage = async (params: Props["params"]) => {
  return sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  })
}

export async function generateMetadata({params}: Props, _parent: ResolvingMetadata): Promise<Metadata> {
  const {data} = await getPage(params)

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

  if (data.seo.image) {
    metadata.openGraph = {
      images: {
        url: data.seo.image ? urlFor(data.seo.image).width(1200).height(630).url() : `/api/og?id=${data._id}`,
        width: 1200,
        height: 630,
      },
    }
  }

  if (data.seo.noIndex) {
    metadata.robots = "noindex"
  }

  return metadata
}

async function Page({params}: Props) {
  const {data} = await getPage(params)

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
