import Link from "next/link"

import {Separator} from "@workspace/ui/components/separator"

import {WikiContentForm} from "@/components/wiki-content-form"

export default function SubmitWikiContentPage() {
  return (
    <main className="flex max-w-[65ch] flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>✏️ Enter Content</h1>
        <h3>📌 Step 2 of 3</h3>
        <p>
          Welcome to the WikiTavern Wiki submission page! Here, you can submit your own Wiki articles for
          review. Please ensure that your submission follows our{" "}
          <Link href="/contribute">Contribution Guidelines.</Link>
        </p>
      </section>
      <Separator />
      <WikiContentForm />
    </main>
  )
}
