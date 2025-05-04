"use client"

import rehypeSanitize from "rehype-sanitize"
import {useState} from "react"
import MDEditor from "@uiw/react-md-editor"
import {useTheme} from "next-themes"

export function MarkdownField() {
  const [value, setValue] = useState<string | undefined>("**My New Wiki**")
  const {theme} = useTheme()

  return (
    <div data-color-mode={theme} className="w-full">
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
