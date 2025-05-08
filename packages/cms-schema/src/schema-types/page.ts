import {DocumentTextIcon} from "@sanity/icons"
import {defineField, defineType} from "sanity"

export const page = defineType({
  name: "page",
  type: "document",
  title: "Page",
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
    defineField({
      name: "seo",
      type: "seo",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Page Content",
      of: [{type: "block"}],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{type: "category"}],
      title: "Category",
      description: "Select an existing category. If 'Other', use 'Requested Category' below.",
    }),
    defineField({
      name: "requestedCategory",
      type: "string",
      title: "Requested Category (if not listed)",
      description: "If the desired category is missing, contributors can suggest one here.",
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{type: "reference", to: {type: "tag"}}],
      description: "Select existing tags.",
    }),
    defineField({
      name: "requestedTags",
      type: "array",
      title: "Requested Tags (if not listed)",
      of: [{type: "string"}],
      description: "Contributors can suggest new tags here if the tag doesn't exist yet.",
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
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Page",
      description: "Include this page in the Featured Wikis section on the homepage.",
    }),
    defineField({
      name: "submittedBy",
      type: "object",
      title: "Submitted By",
      fields: [
        {name: "userId", type: "string", title: "User ID"},
        {name: "username", type: "string", title: "Username"},
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
})
