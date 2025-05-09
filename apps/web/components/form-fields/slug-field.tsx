import {Control, UseFormReturn} from "react-hook-form"

import {Button} from "@workspace/ui/components/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Input} from "@workspace/ui/components/input"

import type {FormData} from "../wiki-metadata-form"

interface SlugFieldProps {
  control: Control<FormData>
  form: UseFormReturn<FormData>
}

export function SlugField({control, form}: SlugFieldProps) {
  return (
    <FormField
      control={control}
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
              disabled={!form.watch("title")}
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
  )
}
