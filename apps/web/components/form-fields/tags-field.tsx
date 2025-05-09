import {Check, ChevronsUpDown} from "lucide-react"
import {Control, UseFormReturn} from "react-hook-form"

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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import {Popover, PopoverContent, PopoverTrigger} from "@workspace/ui/components/popover"
import {cn} from "@workspace/ui/lib/utils"

import type {TAGS_QUERYResult} from "@/types/sanity"

import type {FormData} from "../wiki-metadata-form"

interface TagsFieldProps {
  control: Control<FormData>
  form: UseFormReturn<FormData>
  tags: TAGS_QUERYResult
}

export function TagsField({control, form, tags}: TagsFieldProps) {
  return (
    <FormField
      control={control}
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
                  className={cn("w-full justify-between", !field.value.length && "text-muted-foreground")}
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
                  <CommandEmpty>No tags found.</CommandEmpty>
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
  )
}
