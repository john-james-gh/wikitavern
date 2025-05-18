import Link from "next/link"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

import {FormMessage, Message} from "@/components/form-message"
import {ResetWikiForm} from "@/components/reset-wiki-form"

export default async function SubmitWikiSuccessPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Success 🥳</h1>
        <FormMessage message={searchParams} />
      </section>
      <Separator />
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="outline">
            <Link href="/wiki">👈 Check All Wikis</Link>
          </Button>
          <Button variant="outline">
            <Link href="/profile">👈 Check Your Submissions</Link>
          </Button>
        </div>
        <Button type="button">
          <Link href="/submit-wiki"> Submit another Wiki 🚀</Link>
        </Button>
      </div>
      <ResetWikiForm />
    </main>
  )
}
