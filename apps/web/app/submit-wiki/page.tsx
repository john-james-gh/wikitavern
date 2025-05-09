import Link from "next/link"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

export default function SubmitWikiIndexPage() {
  return (
    <main className="flex max-w-[65ch] flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>📝 Submit Wiki Overview</h1>
        <p>
          ✨ Welcome to the WikiTavern Wiki submission page! Here, you can submit your own Wiki articles for
          review. Please ensure that your submission follows our Contribution Guidelines.
        </p>
        <p>The submission form is split into three parts:</p>
        <ul>
          <li>📋 Wiki Metadata — Step 1 of 3</li>
          <li>✍️ Wiki Content — Step 2 of 3</li>
          <li>🔍 Final Review — Step 3 of 3</li>
        </ul>
        <p>💾 You can return to the previous step at any time without losing any progress.</p>
        <p>
          ✅ In-browser validation will guide you through the submission process, but mind that the final
          validation is done on the server at the time of submission.
        </p>
      </section>
      <Separator />
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline">
          <Link href="/">👈 Back to Home</Link>
        </Button>
        <Button type="button" variant="default">
          <Link href="/submit-wiki/metadata">Continue to Metadata (Step 1 of 3) 👉</Link>
        </Button>
      </div>
    </main>
  )
}
