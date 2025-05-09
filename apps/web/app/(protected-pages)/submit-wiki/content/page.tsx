import Link from "next/link"

import {Separator} from "@workspace/ui/components/separator"

import {SubmitWikiContent} from "@/components/submit-wiki-content"

export default function SubmitWikiContentPage() {
  return (
    <main className="flex max-w-[65ch] flex-col gap-6">
      <section className="prose dark:prose-invert">
        <h1>📝 Fill in the Content</h1>
        <h2>📋 Step 2 of 3</h2>
        <p>
          Welcome to the WikiTavern Wiki submission page! Here, you can submit your own Wiki articles for
          review. Please ensure that your submission follows our{" "}
          <Link href="/contribute">Contribution Guidelines.</Link>
        </p>
      </section>
      <Separator />
      <SubmitWikiContent />
    </main>
  )
}
