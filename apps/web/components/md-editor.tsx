"use client"

import MDEditor from "@uiw/react-md-editor"
import {useTheme} from "next-themes"
import {useState} from "react"
import rehypeSanitize from "rehype-sanitize"

import {Skeleton} from "@workspace/ui/components/skeleton"

export function MarkdownField() {
  const [value, setValue] = useState<string | undefined>("**My New Wiki**")
  const {theme} = useTheme()

  if (!theme) {
    return (
      <div className="w-full">
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <div data-color-mode={theme} className="w-full" suppressHydrationWarning>
      <MDEditor
        value={value}
        onChange={setValue}
        height={600}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commandsFilter={(cmd) => (cmd.name !== "image" && cmd.name !== "strikethrough" ? cmd : false)}
      />
      <textarea name="content" value={value} hidden readOnly />
    </div>
  )
}
