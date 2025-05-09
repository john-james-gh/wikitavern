import {Control, UseFormReturn} from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Input} from "@workspace/ui/components/input"

import type {FormData} from "../submit-wiki-metadata"

interface RequestedCategoryFieldProps {
  control: Control<FormData>
  form: UseFormReturn<FormData>
}

export function RequestedCategoryField({control, form}: RequestedCategoryFieldProps) {
  return (
    <FormField
      control={control}
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
                if (form.getValues("category")) {
                  form.resetField("category")
                }
              }}
            />
          </FormControl>
          <FormDescription>Must be unique and descriptive.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
