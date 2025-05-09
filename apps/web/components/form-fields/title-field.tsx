import {Control} from "react-hook-form"

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

interface TitleFieldProps {
  control: Control<FormData>
}

export function TitleField({control}: TitleFieldProps) {
  return (
    <FormField
      control={control}
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
  )
}
