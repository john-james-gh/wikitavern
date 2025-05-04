import {submitWikiAction} from "@/actions/wiki"
import {FormMessage, Message} from "@/components/form-message"
import {MarkdownField} from "@/components/md-editor"
import {SubmitButton} from "@/components/submit-button"
import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"

export default async function SubmitWikiPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="flex flex-col gap-6 max-w-[65ch]">
      <section className="prose dark:prose-invert">
        <h1>✍️ Submit Wiki</h1>
      </section>
      <form className="flex flex-col gap-4">
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" />
        </div>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input name="slug" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <MarkdownField />
        </div>
        <SubmitButton formAction={submitWikiAction} pendingText="Submitting Wiki...">
          Submit
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
