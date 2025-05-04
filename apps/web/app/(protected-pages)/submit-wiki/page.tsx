import {submitWikiAction} from "@/actions/wiki"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"
import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {Textarea} from "@workspace/ui/components/textarea"

export default async function SubmitWikiPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="prose dark:prose-invert">
      <h1>✍️ Submit Wiki</h1>
      <form className="flex flex-col gap-4">
        <Label htmlFor="title">Title</Label>
        <Input name="title" />
        <Label htmlFor="slug">Slug</Label>
        <Input name="slug" />
        <Label htmlFor="content">Content</Label>
        <Textarea name="content" placeholder="Type your Wiki contents in markdown here." className="w-full" />
        <SubmitButton formAction={submitWikiAction} pendingText="Submitting Wiki...">
          Submit
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
