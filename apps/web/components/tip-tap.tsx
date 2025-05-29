"use client"

import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import {Button} from "@workspace/ui/components/button"

interface TiptapProps {
  content: string
}

export function Tiptap({content}: TiptapProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: true,
    injectCSS: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert focus:outline-none",
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          type="button"
          variant={editor.isActive("heading", {level: 1}) ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
        >
          H1
        </Button>
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
