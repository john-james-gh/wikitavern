"use client"

import rehypeSanitize from "rehype-sanitize"
import {useState} from "react"
import MDEditor from "@uiw/react-md-editor"
import {useTheme} from "next-themes"

export function MarkdownField() {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**")
  const {resolvedTheme} = useTheme()

  return (
    <div data-color-mode={resolvedTheme} className="w-full">
      <MDEditor
        value={value}
        onChange={setValue}
        height={600}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <textarea name="content" value={value} hidden readOnly />
    </div>
  )
}
