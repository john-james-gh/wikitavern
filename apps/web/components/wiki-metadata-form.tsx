"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@workspace/ui/components/button"
import {Form} from "@workspace/ui/components/form"
import {Separator} from "@workspace/ui/components/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@workspace/ui/components/tabs"

import {useWikiStore} from "@/stores/wiki"
import {CATEGORIES_QUERYResult, TAGS_QUERYResult} from "@/types/sanity"

import {CategoryField} from "./form-fields/category-field"
import {RequestedCategoryField} from "./form-fields/requested-category-field"
import {RequestedTagsField} from "./form-fields/requested-tags-field"
import {SelectedTagsDisplay} from "./form-fields/selected-tags-display"
import {SlugField} from "./form-fields/slug-field"
import {TagsField} from "./form-fields/tags-field"
import {TitleField} from "./form-fields/title-field"

const formSchema = z
  .object({
    title: z.string().min(2).max(50),
    slug: z.string().min(2).max(50),
    category: z.string().max(100),
    requestedCategory: z.string().max(50),
    tags: z.array(z.string().max(100)),
    requestedTags: z.array(z.string()),
  })
  .refine((data) => data.category || data.requestedCategory, {
    message: "Please select a category or request a new one",
    path: ["category"],
  })
  .refine((data) => data.category || data.requestedCategory, {
    message: "Please select a category or request a new one",
    path: ["requestedCategory"],
  })
  .refine((data) => data.tags.length > 0 || data.requestedTags.length > 0, {
    message: "Please select at least one tag or request a new tag",
    path: ["tags"], // This will show the error on both tag fields
  })
  .refine((data) => data.tags.length > 0 || data.requestedTags.length > 0, {
    message: "Please select at least one tag or request a new tag",
    path: ["requestedTags"], // This will show the error on both tag fields
  })

export type FormData = z.infer<typeof formSchema>

interface SubmitWikiMetadataProps {
  categories: CATEGORIES_QUERYResult
  tags: TAGS_QUERYResult
}

export function WikiMetadataForm({categories, tags}: SubmitWikiMetadataProps) {
  const setWiki = useWikiStore((state) => state.setWiki)
  const wiki = useWikiStore((state) => state.wiki)
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: wiki.title,
      slug: wiki.slug,
      category: wiki.category_id ?? undefined,
      requestedCategory: wiki.requested_category ?? undefined,
      tags: wiki.tag_ids ?? undefined,
      requestedTags: wiki.requested_tags ?? undefined,
    },
  })

  function onSubmit(values: FormData) {
    setWiki({
      title: values.title,
      slug: values.slug,
      category_id: values.category,
      requested_category: values.requestedCategory,
      tag_ids: values.tags,
      requested_tags: values.requestedTags,
    })
    router.push("/submit-wiki/content")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <TitleField control={form.control} />
        <SlugField control={form.control} form={form} />
        <Separator />
        <Tabs defaultValue="existing">
          <TabsList className="w-full">
            <TabsTrigger value="existing">Existing Categories 📑</TabsTrigger>
            <TabsTrigger value="new">New Category ➕</TabsTrigger>
          </TabsList>
          <TabsContent value="existing" className="py-2">
            <CategoryField control={form.control} form={form} categories={categories} />
          </TabsContent>
          <TabsContent value="new" className="py-2">
            <RequestedCategoryField control={form.control} form={form} />
          </TabsContent>
        </Tabs>
        <Separator />
        <div className="flex flex-col gap-2">
          <Tabs defaultValue="existing">
            <TabsList className="w-full">
              <TabsTrigger value="existing">Existing Tags 📑</TabsTrigger>
              <TabsTrigger value="new">New Tags ➕</TabsTrigger>
            </TabsList>
            <TabsContent value="existing" className="py-2">
              <TagsField control={form.control} form={form} tags={tags} />
            </TabsContent>
            <TabsContent value="new" className="py-2">
              <RequestedTagsField control={form.control} form={form} />
            </TabsContent>
          </Tabs>
          <SelectedTagsDisplay form={form} tags={tags} />
        </div>
        <Separator />
        <div className="flex justify-between gap-2">
          <Button type="button" variant="outline">
            <Link href="/submit-wiki">👈 Back to Overview</Link>
          </Button>
          <Button type="submit">Continue to Content (Step 2 of 3) 👉</Button>
        </div>
      </form>
    </Form>
  )
}
