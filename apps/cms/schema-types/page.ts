import {defineType, defineField} from "sanity"
import {DocumentTextIcon} from "@sanity/icons"

export const page = defineType({
  name: "page",
  type: "document",
  title: "Wiki Page",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: "content", type: "array", title: "Page Content", of: [{type: "block"}]}),
    defineField({
      name: "category",
      type: "reference",
      to: [{type: "category"}],
      title: "Category",
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{type: "reference", to: {type: "tag"}}],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      title: "Last Updated",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Page",
      description: "Include this page in the Featured Wikis section on the homepage.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
})
