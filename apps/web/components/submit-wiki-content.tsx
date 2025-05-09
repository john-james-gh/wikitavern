"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import MDEditor from "@uiw/react-md-editor"
import {Info} from "lucide-react"
import {useTheme} from "next-themes"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import rehypeSanitize from "rehype-sanitize"
import {z} from "zod"

import {Alert, AlertDescription, AlertTitle} from "@workspace/ui/components/alert"
import {Button} from "@workspace/ui/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Separator} from "@workspace/ui/components/separator"
import {Skeleton} from "@workspace/ui/components/skeleton"

import {useWikiStore} from "@/app/(protected-pages)/submit-wiki/layout"

const formSchema = z.object({
  content: z.string().min(1, "🙁 Content cannot be empty").max(100000, "Content is too long"),
})

type FormData = z.infer<typeof formSchema>

export function SubmitWikiContent() {
  const setWiki = useWikiStore((state) => state.setWiki)
  const wiki = useWikiStore((state) => state.wiki)
  const {theme} = useTheme()
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: wiki.content,
    },
  })

  function onSubmit(values: FormData) {
    console.log(values)
    setWiki(values)
    router.push("/submit-wiki/review")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="content"
          render={({field}) => (
            <FormItem>
              <FormLabel>Content (required) 📝</FormLabel>
              <Alert>
                <Info className="h-4 w-4" color="blue" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can edit in full screen mode by clicking on the icon in the top right corner of the
                  markdown editor.
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
                    commandsFilter={(cmd) =>
                      cmd.name !== "image" && cmd.name !== "strikethrough" ? cmd : false
                    }
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
        <Separator />
        <div className="flex justify-between gap-2">
          <Button type="button" variant="outline">
            <Link href="/submit-wiki/metadata">⬅️ Back to Metadata (Step 1 of 3)</Link>
          </Button>
          <Button type="submit">Continue to Review (Step 3 of 3) ➡️</Button>
        </div>
      </form>
    </Form>
  )
}
