import MDEditor from "@uiw/react-md-editor"
import {Info} from "lucide-react"
import {useTheme} from "next-themes"
import {Control} from "react-hook-form"
import rehypeSanitize from "rehype-sanitize"

import {Alert, AlertDescription, AlertTitle} from "@workspace/ui/components/alert"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Skeleton} from "@workspace/ui/components/skeleton"

interface ContentFormData {
  content: string
}

interface ContentFieldProps {
  control: Control<ContentFormData>
}

export function ContentField({control}: ContentFieldProps) {
  const {theme} = useTheme()

  return (
    <FormField
      control={control}
      name="content"
      render={({field}) => (
        <FormItem>
          <FormLabel>Content (required) 📝</FormLabel>
          <Alert>
            <Info className="h-4 w-4" color="blue" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can edit in full screen mode by clicking on the icon in the top right corner of the markdown
              editor.
            </AlertDescription>
          </Alert>
          {theme ? (
            <FormControl data-color-mode={theme}>
              <MDEditor
                visibleDragbar={false}
                value={field.value}
                onChange={field.onChange}
                height={200}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                commandsFilter={(cmd) => (cmd.name !== "image" && cmd.name !== "strikethrough" ? cmd : false)}
              />
            </FormControl>
          ) : (
            <Skeleton className="h-[200px] w-full" />
          )}
          <FormDescription>
            ℹ️ Write your markdown content in the left pane and it will be automatically previewed in the
            right pane. Use the toolbar to format your content and help with the markdown syntax.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
