import {components} from "@/lib/sanity/portable-text-components"
import {createClient} from "@/lib/supabase/server"
import {PortableText} from "next-sanity"

type Props = {
  params: Promise<{slug: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export default async function Page({params}: Props) {
  const {slug} = await params
  const supabase = await createClient()

  const {data: wiki, error} = await supabase
    .from("wiki_submissions")
    .select("*")
    .eq("id", slug)
    .eq("status", "pending")
    .single()

  if (error) {
    console.error("Failed to fetch pending wiki:", error)
    throw new Error("Failed to fetch wiki")
  }

  return (
    <main className="flex flex-col prose dark:prose-invert">
      <h1>🧑‍⚖️ Review Pending Wiki</h1>
      <h2>{wiki.title}</h2>
      {wiki.content && <PortableText value={wiki.content} components={components} />}
    </main>
  )
}
