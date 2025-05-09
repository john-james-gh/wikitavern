"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {Check, ChevronsUpDown, X} from "lucide-react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@workspace/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Input} from "@workspace/ui/components/input"
import {Popover, PopoverContent, PopoverTrigger} from "@workspace/ui/components/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@workspace/ui/components/select"
import {Separator} from "@workspace/ui/components/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@workspace/ui/components/tabs"
import {cn} from "@workspace/ui/lib/utils"

import {useWikiStore} from "@/stores/wiki"
import {CATEGORIES_QUERYResult, TAGS_QUERYResult} from "@/types/sanity"

const formSchema = z
  .object({
    title: z.string().min(2).max(50),
    slug: z.string().min(2).max(50),
    category: z.string().max(50),
    requestedCategory: z.string().max(50),
    tags: z.array(z.string()),
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

type FormData = z.infer<typeof formSchema>

interface SubmitWikiMetadataProps {
  categories: CATEGORIES_QUERYResult
  tags: TAGS_QUERYResult
}

export function SubmitWikiMetadata({categories, tags}: SubmitWikiMetadataProps) {
  const setWiki = useWikiStore((state) => state.setWiki)
  const wiki = useWikiStore((state) => state.wiki)
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: wiki.title,
      slug: wiki.slug,
      category: wiki.category,
      requestedCategory: wiki.requestedCategory,
      tags: wiki.tags,
      requestedTags: wiki.requestedTags,
    },
  })

  function onSubmit(values: FormData) {
    console.log(values)
    setWiki(values)
    router.push("/submit-wiki/content")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title (required) 📝</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of the Wiki. It should be descriptive and concise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({field}) => (
            <FormItem>
              <FormLabel>Slug (required) 🔗</FormLabel>
              <div className="grid grid-cols-5 gap-2">
                <FormControl className="col-span-4">
                  <Input placeholder="Slug" {...field} />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  className="col-span-1"
                  onClick={() => {
                    const title = form.getValues("title")
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")
                    field.onChange(slug)
                  }}
                >
                  Generate ✨
                </Button>
              </div>
              <FormDescription>
                Must be unique and optimized for SEO.{" "}
                <a
                  href="https://www.freecodecamp.org/news/seo-friendly-urls-for-your-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Learn more here.
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <Tabs defaultValue="existing">
          <TabsList className="w-full">
            <TabsTrigger value="existing">Existing Categories 📑</TabsTrigger>
            <TabsTrigger value="new">New Category ➕</TabsTrigger>
          </TabsList>
          <TabsContent value="existing">
            <FormField
              control={form.control}
              name="category"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category (required) 🏷️</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      form.trigger("requestedCategory")
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug!}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can request a new category in the New Category section.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="new">
            <FormField
              control={form.control}
              name="requestedCategory"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category (required) 🆕</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a new category"
                      onBlur={() => {
                        form.trigger("category")
                      }}
                    />
                  </FormControl>
                  <FormDescription>Must be unique and descriptive.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex flex-col gap-2">
          <Tabs defaultValue="existing">
            <TabsList className="w-full">
              <TabsTrigger value="existing">Existing Tags 📑</TabsTrigger>
              <TabsTrigger value="new">New Tags ➕</TabsTrigger>
            </TabsList>
            <TabsContent value="existing">
              <FormField
                control={form.control}
                name="tags"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tags (required) 🏷️</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value.length && "text-muted-foreground",
                            )}
                          >
                            {field.value.length > 0
                              ? field.value.map((tag) => tags.find((t) => t.slug === tag)?.name).join(", ")
                              : "Select tags"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-xl p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." className="h-9 w-full" />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {tags.map((tag) => {
                                if (!tag.slug || !tag.name) return null
                                return (
                                  <CommandItem
                                    value={tag.name}
                                    key={tag.slug}
                                    onSelect={() => {
                                      const currentTags = field.value
                                      if (currentTags.includes(tag.slug!)) {
                                        // Remove tag if already selected
                                        form.setValue(
                                          "tags",
                                          currentTags.filter((t) => t !== tag.slug),
                                        )
                                        form.trigger("tags")
                                        form.trigger("requestedTags")
                                      } else {
                                        // Add tag if not selected
                                        form.setValue("tags", [...currentTags, tag.slug!])
                                        form.trigger("tags")
                                        form.trigger("requestedTags")
                                      }
                                    }}
                                  >
                                    {tag.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value.includes(tag.slug!) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                )
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>You can combine existing and newly requested tags.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="new">
              <FormField
                control={form.control}
                name="requestedTags"
                render={({field}) => {
                  const [inputValue, setInputValue] = React.useState("")
                  return (
                    <FormItem>
                      <FormLabel>Tags (required) 🆕</FormLabel>
                      <div className="grid grid-cols-5 gap-2">
                        <FormControl className="col-span-4">
                          <Input
                            placeholder="Enter a one-word tag"
                            value={inputValue}
                            onChange={(e) => {
                              setInputValue(e.target.value)
                            }}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="col-span-1"
                          onClick={() => {
                            if (inputValue && inputValue.trim()) {
                              // Add the new tag to the array
                              const newTags = [...field.value, inputValue.trim()]
                              field.onChange(newTags)
                              // Clear the input
                              setInputValue("")
                              form.trigger("tags")
                              form.trigger("requestedTags")
                            }
                          }}
                        >
                          Add ➕
                        </Button>
                      </div>
                      <FormDescription>Each tag should be one word and descriptive.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </TabsContent>
          </Tabs>
          <p className="flex flex-wrap gap-2 items-center text-sm font-medium">
            <span>All Selected Tags:</span>
            {form.watch("tags").length || form.watch("requestedTags").length ? null : (
              <span className="text-muted-foreground py-0.5">None</span>
            )}
            {form.watch("tags").map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1"
              >
                {tags.find((t) => t.slug === tag)?.name || tag}
                <button
                  type="button"
                  onClick={() => {
                    const currentTags = form.getValues("tags")
                    form.setValue(
                      "tags",
                      currentTags.filter((t) => t !== tag),
                    )
                  }}
                  className="hover:text-red-500 focus:outline-none cursor-pointer"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
            {form.watch("requestedTags").map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    const currentTags = form.getValues("requestedTags")
                    form.setValue(
                      "requestedTags",
                      currentTags.filter((t) => t !== tag),
                    )
                  }}
                  className="hover:text-red-500 focus:outline-none cursor-pointer"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
          </p>
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
