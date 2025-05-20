import {WikiReviewForm} from "@/components/wiki-review-form"

export default function SubmitWikiReviewPage() {
  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>🔍 Review Submission</h1>
        <h3>📌 Step 3 of 3</h3>
      </section>
      <WikiReviewForm />
    </main>
  )
}
