import {Control, UseFormReturn} from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@workspace/ui/components/select"

import type {CATEGORIES_QUERYResult} from "@/types/sanity"

import type {FormData} from "../submit-wiki-metadata"

interface CategoryFieldProps {
  control: Control<FormData>
  form: UseFormReturn<FormData>
  categories: CATEGORIES_QUERYResult
}

export function CategoryField({control, form, categories}: CategoryFieldProps) {
  return (
    <FormField
      control={control}
      name="category"
      render={({field}) => (
        <FormItem>
          <FormLabel>Category (required) 🏷️</FormLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              form.trigger("requestedCategory")
              if (form.getValues("requestedCategory")) {
                form.resetField("requestedCategory")
              }
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
          <FormDescription>You can request a new category in the New Category section.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
