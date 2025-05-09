import {WikiReviewForm} from "@/components/wiki-review-form"

export default function SubmitWikiReviewPage() {
  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Review your submission</h1>
        <h2>📋 Step 3 of 3</h2>
      </section>
      <WikiReviewForm />
    </main>
  )
}
