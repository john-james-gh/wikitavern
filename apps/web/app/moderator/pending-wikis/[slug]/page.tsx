import type {TypedObject} from "@portabletext/block-tools"
import {PortableText} from "next-sanity"

import {WikiApproveForm} from "@/components/wiki-approve-form"
import {components} from "@/lib/sanity/portable-text-components"
import {createClient} from "@/lib/supabase/server"

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
    <main className="prose dark:prose-invert flex flex-col">
      <h1>🧑‍⚖️ Review Pending Wiki</h1>
      <WikiApproveForm wiki={wiki} slug={slug} />
      <h3>{wiki.title}</h3>
      {wiki.content && (
        <PortableText value={wiki.content as unknown as TypedObject[]} components={components} />
      )}
    </main>
  )
}
