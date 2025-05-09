import React from "react"
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

import type {FormData} from "../submit-wiki-metadata"

interface RequestedTagsFieldProps {
  control: Control<FormData>
  form: UseFormReturn<FormData>
}

export function RequestedTagsField({control, form}: RequestedTagsFieldProps) {
  const [inputValue, setInputValue] = React.useState("")

  return (
    <FormField
      control={control}
      name="requestedTags"
      render={({field}) => (
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
      )}
    />
  )
}
