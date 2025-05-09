import Link from "next/link"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

import {FormMessage, Message} from "@/components/form-message"

export default async function SubmitWikiSuccessPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Success 🥳</h1>
        <FormMessage message={searchParams} />
      </section>
      <Separator />
      <div className="flex justify-end gap-2">
        <Button type="button">
          <Link href="/submit-wiki">Submit another Wiki 🚀</Link>
        </Button>
      </div>
    </main>
  )
}
