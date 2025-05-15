import Link from "next/link"
import {redirect} from "next/navigation"

import {Separator} from "@workspace/ui/components/separator"

import {Message} from "@/components/form-message"
import {WikiMetadataForm} from "@/components/wiki-metadata-form"
import {client} from "@/lib/sanity/client"
import {CATEGORIES_QUERY, TAGS_QUERY} from "@/lib/sanity/queries"
import {createClient} from "@/lib/supabase/server"

async function getCategories() {
  return client.fetch(CATEGORIES_QUERY)
}

async function getTags() {
  return client.fetch(TAGS_QUERY)
}

export default async function SubmitWikiMetadataPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  const categoryData = getCategories()
  const tagData = getTags()
  const [categories, tags] = await Promise.all([categoryData, tagData])

  const supabase = await createClient()

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/sign-in")
  }

  return (
    <main className="flex max-w-[65ch] flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>📝 Fill in the Metadata</h1>
        <h2>📋 Step 1 of 3</h2>
        <p>
          Welcome to the WikiTavern Wiki submission page! Here, you can submit your own Wiki articles for
          review. Please ensure that your submission follows our{" "}
          <Link href="/contribute">Contribution Guidelines.</Link>
        </p>
      </section>
      <Separator />
      <WikiMetadataForm categories={categories} tags={tags} />
    </main>
  )
}
