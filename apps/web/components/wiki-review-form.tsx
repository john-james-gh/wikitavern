"use client"

import Link from "next/link"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

import {submitWikiAction} from "@/actions/wiki"
import {useWikiStore} from "@/stores/wiki"

export function WikiReviewForm() {
  const wiki = useWikiStore((state) => state.wiki)

  async function onClick() {
    await submitWikiAction(wiki)
  }

  return (
    <section className="flex flex-col gap-4">
      <pre>{JSON.stringify(wiki, null, 2)}</pre>
      <Separator />
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline">
          <Link href="/submit-wiki/content">⬅️ Back to Content (Step 2 of 3)</Link>
        </Button>
        <Button type="button" onClick={onClick}>
          Submit 🥳
        </Button>
      </div>
    </section>
  )
}
