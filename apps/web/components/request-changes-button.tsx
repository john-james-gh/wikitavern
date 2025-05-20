"use client"

// @ts-ignore
import toMarkdown from "@sanity/block-content-to-markdown"
import {Pencil} from "lucide-react"
import {useRouter} from "next/navigation"

import {Button} from "@workspace/ui/components/button"

import {useWikiStore} from "@/stores/wiki"
import {PAGE_QUERYResult} from "@/types/sanity"

interface RequestChangesButtonProps {
  wiki: NonNullable<PAGE_QUERYResult>
}

export function RequestChangesButton({wiki}: RequestChangesButtonProps) {
  const router = useRouter()
  const setWiki = useWikiStore((state) => state.setWiki)

  const handleRequestChanges = () => {
    setWiki({
      title: wiki.title || "",
      slug: wiki.slug?.current || "",
      category: wiki.category?.slug?.current || "",
      tags: wiki.tags?.map((tag) => tag.slug?.current || "") || [],
      content: toMarkdown(wiki.content),
    })
    router.push("/submit-wiki/metadata")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRequestChanges}>
      <Pencil className="w-4 h-4 mr-1" />
      Request Changes
    </Button>
  )
}
