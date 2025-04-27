import {defineType, defineField} from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "patreonLink",
      type: "url",
      title: "Patreon / Support Link",
    }),
    defineField({
      name: "aboutText",
      type: "array",
      title: "About Section Text",
      of: [{type: "block"}],
    }),
    defineField({
      name: "footerText",
      type: "text",
      title: "Footer Text",
    }),
  ],
})
