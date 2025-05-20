"use client"

import {Button} from "@workspace/ui/components/button"

import {approveWikiAction} from "@/actions/wiki"
import {Database} from "@/types/supabase"

interface WikiApproveFormProps {
  wiki: Database["public"]["Tables"]["wiki_submissions"]["Row"]
  slug: string
}

export function WikiApproveForm({wiki, slug}: WikiApproveFormProps) {
  async function handleApprove() {
    if (!wiki) {
      throw new Error("Wiki not found")
    }

    await approveWikiAction(wiki, slug)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between gap-2">
        <Button type="submit" variant="outline" onClick={handleApprove}>
          Approve
        </Button>
        <Button type="submit" variant="outline">
          Reject
        </Button>
      </div>
    </section>
  )
}
