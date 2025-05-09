import Link from "next/link"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

import {FormMessage, Message} from "@/components/form-message"

export default async function SubmitWikiErrorPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="flex max-w-[65ch] flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>Error</h1>
      </section>
      <FormMessage message={searchParams} />
      <Separator />
      <div className="flex  gap-2">
        <Button type="button" variant="outline">
          <Link href="/submit-wiki/metadata">⬅️ To Metadata (Step 1 of 3)</Link>
        </Button>
        <Button type="button" variant="outline">
          <Link href="/submit-wiki/content">⬅️ To Content (Step 2 of 3)</Link>
        </Button>
        <Button type="button" variant="outline">
          <Link href="/submit-wiki/review">⬅️ To Review (Step 3 of 3)</Link>
        </Button>
      </div>
    </main>
  )
}
