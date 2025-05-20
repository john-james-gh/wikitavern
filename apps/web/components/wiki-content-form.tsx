"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {InfoIcon} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@workspace/ui/components/button"
import {Form} from "@workspace/ui/components/form"
import {Tooltip, TooltipContent, TooltipTrigger} from "@workspace/ui/components/tooltip"

import {useWikiStore} from "@/stores/wiki"

import {ContentField} from "./form-fields/content-field"

const formSchema = z.object({
  content: z.string().min(1, "🙁 Content cannot be empty").max(100000, "Content is too long"),
})

export type FormData = z.infer<typeof formSchema>

export function WikiContentForm() {
  const setWiki = useWikiStore((state) => state.setWiki)
  const wiki = useWikiStore((state) => state.wiki)
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: wiki.content,
    },
  })

  function onSubmit(values: FormData) {
    setWiki(values)
    router.push("/submit-wiki/review")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <ContentField control={form.control} />
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline">
              <Link href="/submit-wiki/metadata">👈 Back to Metadata (Step 1 of 3)</Link>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Don't worry! Your progress is saved automatically.</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit">Continue to Review (Step 3 of 3) 👉</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
