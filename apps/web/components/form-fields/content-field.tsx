import MDEditor from "@uiw/react-md-editor"
import {useTheme} from "next-themes"
import {Control} from "react-hook-form"
import rehypeSanitize from "rehype-sanitize"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Skeleton} from "@workspace/ui/components/skeleton"

import type {FormData} from "../wiki-content-form"

interface ContentFieldProps {
  control: Control<FormData>
}

export function ContentField({control}: ContentFieldProps) {
  const {theme} = useTheme()

  return (
    <FormField
      control={control}
      name="content"
      render={({field}) => (
        <FormItem className="flex flex-col gap-4" data-color-mode={theme}>
          <FormLabel>Content (required) 📝</FormLabel>
          {theme ? (
            <FormControl>
              <div className="[&_.w-md-editor-toolbar_button]:scale-125">
                <MDEditor
                  visibleDragbar={false}
                  value={field.value}
                  onChange={field.onChange}
                  height={200}
                  preview="edit"
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                    disallowedElements: ["image", "strikethrough"],
                  }}
                  commandsFilter={(cmd) =>
                    cmd.name !== "image" &&
                    cmd.name !== "strikethrough" &&
                    cmd.name !== "preview" &&
                    cmd.name !== "live" &&
                    cmd.name !== "edit"
                      ? cmd
                      : false
                  }
                />
              </div>
            </FormControl>
          ) : (
            <Skeleton className="h-[200px] w-full" />
          )}
          <FormDescription>
            ℹ️ Write your markdown content in the text area and it will be automatically previewed below.
          </FormDescription>
          <FormMessage />
          <div className="p-6 border rounded-md w-full">
            <MDEditor.Markdown
              source={field.value || "#### Content will be preview here 🙂"}
              className="prose dark:prose-invert"
            />
          </div>
        </FormItem>
      )}
    />
  )
}
