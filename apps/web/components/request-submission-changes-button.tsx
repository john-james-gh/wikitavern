"use client"

// @ts-ignore
import toMarkdown from "@sanity/block-content-to-markdown"
import {Pencil} from "lucide-react"
import {useRouter} from "next/navigation"

import {Button} from "@workspace/ui/components/button"

import {useWikiStore} from "@/stores/wiki"
import type {Database} from "@/types/supabase"

interface RequestSubmissionChangesButtonProps {
  wiki: NonNullable<Database["public"]["Tables"]["wiki_submissions"]["Row"]>
}

export function RequestSubmissionChangesButton({wiki}: RequestSubmissionChangesButtonProps) {
  const router = useRouter()
  const setWiki = useWikiStore((state) => state.setWiki)

  const handleRequestChanges = () => {
    setWiki({
      title: wiki.title || "",
      slug: wiki.slug || "",
      category: wiki.category_id || "",
      tags: wiki.requested_tags || [],
      content: toMarkdown(wiki.content),
    })
    router.push("/submit-wiki/metadata")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRequestChanges}>
      <Pencil className="w-4 h-4 mr-1" />
      Edit Submission
    </Button>
  )
}
