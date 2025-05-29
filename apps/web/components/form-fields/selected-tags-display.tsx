import {X} from "lucide-react"
import {UseFormReturn} from "react-hook-form"

import type {TAGS_QUERYResult} from "@/types/sanity"

import type {FormData} from "../wiki-metadata-form"

interface SelectedTagsDisplayProps {
  form: UseFormReturn<FormData>
  tags: TAGS_QUERYResult
}

export function SelectedTagsDisplay({form, tags}: SelectedTagsDisplayProps) {
  const selectedTags = form.watch("tags")
  const requestedTags = form.watch("requestedTags")

  return (
    <p className="flex flex-wrap gap-2 items-center text-sm font-medium">
      <span>All Selected Tags:</span>
      {selectedTags?.length || requestedTags?.length ? null : (
        <span className="text-muted-foreground py-0.5">None</span>
      )}
      {selectedTags?.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1"
        >
          {tags.find((t) => t.slug === tag)?.name || tag}
          <button
            type="button"
            onClick={() => {
              const currentTags = form.getValues("tags")
              form.setValue(
                "tags",
                currentTags.filter((t) => t !== tag),
              )
            }}
            className="hover:text-red-500 focus:outline-none cursor-pointer"
          >
            <X size={16} />
          </button>
        </span>
      ))}
      {requestedTags?.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 rounded-full bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1"
        >
          {tag}
          <button
            type="button"
            onClick={() => {
              const currentTags = form.getValues("requestedTags")
              form.setValue(
                "requestedTags",
                currentTags.filter((t) => t !== tag),
              )
            }}
            className="hover:text-red-500 focus:outline-none cursor-pointer"
          >
            <X size={16} />
          </button>
        </span>
      ))}
    </p>
  )
}
