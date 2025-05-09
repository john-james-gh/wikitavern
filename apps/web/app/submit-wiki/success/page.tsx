import {Separator} from "@workspace/ui/components/separator"

import {FormMessage, Message} from "@/components/form-message"
import {SubmitNewWikiButton} from "@/components/submit-new-wiki-button"

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
        <SubmitNewWikiButton />
      </div>
    </main>
  )
}
