"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@workspace/ui/components/button"
import {Form} from "@workspace/ui/components/form"
import {Separator} from "@workspace/ui/components/separator"

import {useWikiStore} from "@/stores/wiki"

import {ContentField} from "./form-fields/content-field"

const formSchema = z.object({
  content: z.string().min(1, "🙁 Content cannot be empty").max(100000, "Content is too long"),
})

type FormData = z.infer<typeof formSchema>

export function SubmitWikiContent() {
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
        <Separator />
        <div className="flex justify-between gap-2">
          <Button type="button" variant="outline">
            <Link href="/submit-wiki/metadata">👈 Back to Metadata (Step 1 of 3)</Link>
          </Button>
          <Button type="submit">Continue to Review (Step 3 of 3) 👉</Button>
        </div>
      </form>
    </Form>
  )
}
