import {submitWikiAction} from "@/actions/wiki"
import {FormMessage, Message} from "@/components/form-message"
import {MarkdownField} from "@/components/md-editor"
import {SubmitButton} from "@/components/submit-button"
import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {ArrowLeft} from "lucide-react"
import Link from "next/link"

export default async function SubmitWikiPage(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  return (
    <main className="flex flex-col gap-6 max-w-[65ch]">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </nav>
      <section className="prose dark:prose-invert">
        <h1>✍️ Submit Your Wiki</h1>
        <p>
          Welcome to the WikiTavern Wiki submission page! Here, you can submit your own Wiki articles for
          review. Please ensure that your submission follows our{" "}
          <Link href="/contribute">Contribution Guidelines.</Link>
        </p>
      </section>
      <form className="flex flex-col gap-4">
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <p className="text-sm prose dark:prose-invert">
            This is the title of the Wiki. It should be descriptive and concise.
          </p>
          <Input name="title" />
        </div>
        <div className="max-w-md flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <p className="text-sm prose dark:prose-invert">
            Must be unique. Look up existing Wikis to ensure you're not creating a duplicate.
          </p>
          <Input name="slug" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <p className="text-sm prose dark:prose-invert">
            This is the content of the Wiki. You must use Markdown to format your text. Type your content in
            the left pane and see the preview on the right.{" "}
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Learn more about Markdown
            </a>
          </p>
          <p className="text-sm prose dark:prose-invert">
            Enter full-screen mode in the top right corner of the editor.
          </p>
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
