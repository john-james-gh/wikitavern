import {defineType, defineField} from "sanity"

export const tag = defineType({
  name: "tag",
  type: "document",
  title: "Tag",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Tag Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
})
