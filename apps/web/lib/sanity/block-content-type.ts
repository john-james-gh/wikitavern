// ⚠️ AUTO-GENERATED — DO NOT EDIT THIS FILE ⚠️
export const blockContentType: any = {
  jsonType: "array",
  type: {
    name: "array",
    type: null,
    jsonType: "array",
    of: [],
  },
  name: "array",
  title: "Page Content",
  of: [
    {
      type: {
        name: "block",
        title: "Block",
        type: null,
        jsonType: "object",
      },
      name: "block",
      title: "Block",
      jsonType: "object",
      options: {},
      fields: [
        {
          name: "children",
          type: {
            jsonType: "array",
            type: {
              name: "array",
              type: null,
              jsonType: "array",
              of: [],
            },
            name: "array",
            title: "Content",
            of: [
              {
                type: {
                  name: "span",
                  title: "Span",
                  type: null,
                  jsonType: "object",
                },
                name: "span",
                title: "Span",
                jsonType: "object",
                fields: [
                  {
                    name: "marks",
                    type: {
                      jsonType: "array",
                      type: {
                        name: "array",
                        type: null,
                        jsonType: "array",
                        of: [],
                      },
                      name: "array",
                      title: "Marks",
                      of: [
                        {
                          jsonType: "string",
                          type: {
                            name: "string",
                            title: "String",
                            type: null,
                            jsonType: "string",
                          },
                          name: "string",
                          title: "String",
                          preview: {},
                        },
                      ],
                    },
                  },
                  {
                    name: "text",
                    type: {
                      jsonType: "string",
                      type: {
                        name: "string",
                        title: "String",
                        type: null,
                        jsonType: "string",
                      },
                      name: "string",
                      title: "Text",
                      preview: {},
                    },
                  },
                ],
                annotations: [
                  {
                    jsonType: "object",
                    type: {
                      name: "object",
                      title: "Object",
                      type: null,
                      jsonType: "object",
                    },
                    name: "link",
                    title: "Link",
                    fields: [
                      {
                        name: "href",
                        type: {
                          jsonType: "string",
                          type: {
                            name: "url",
                            title: "Url",
                            type: null,
                            jsonType: "string",
                          },
                          name: "url",
                          title: "Link",
                          description: "A valid web, email, phone, or relative link.",
                          preview: {},
                        },
                      },
                    ],
                    i18nTitleKey: "inputs.portable-text.annotation.link",
                    options: {
                      modal: {
                        type: "popover",
                      },
                    },
                    orderings: [],
                    fieldsets: [
                      {
                        single: true,
                        field: {
                          name: "href",
                          type: {
                            jsonType: "string",
                            type: {
                              name: "url",
                              title: "Url",
                              type: null,
                              jsonType: "string",
                            },
                            name: "url",
                            title: "Link",
                            description: "A valid web, email, phone, or relative link.",
                            preview: {},
                          },
                        },
                      },
                    ],
                    groups: [],
                    preview: {
                      select: {
                        href: "href",
                      },
                    },
                  },
                ],
                decorators: [
                  {
                    title: "Strong",
                    value: "strong",
                    i18nTitleKey: "inputs.portable-text.decorator.strong",
                  },
                  {
                    title: "Italic",
                    value: "em",
                    i18nTitleKey: "inputs.portable-text.decorator.emphasis",
                  },
                  {
                    title: "Code",
                    value: "code",
                    i18nTitleKey: "inputs.portable-text.decorator.code",
                  },
                  {
                    title: "Underline",
                    value: "underline",
                    i18nTitleKey: "inputs.portable-text.decorator.underline",
                  },
                  {
                    title: "Strike",
                    value: "strike-through",
                    i18nTitleKey: "inputs.portable-text.decorator.strike-through",
                  },
                ],
                options: {},
                marks: [],
                preview: {
                  select: {
                    text: "text",
                    marks: "marks",
                  },
                },
              },
            ],
          },
        },
        {
          name: "style",
          type: {
            jsonType: "string",
            type: {
              name: "string",
              title: "String",
              type: null,
              jsonType: "string",
            },
            name: "string",
            title: "Style",
            options: {
              list: [
                {
                  title: "Normal",
                  value: "normal",
                  i18nTitleKey: "inputs.portable-text.style.normal",
                },
                {
                  title: "Heading 1",
                  value: "h1",
                  i18nTitleKey: "inputs.portable-text.style.h1",
                },
                {
                  title: "Heading 2",
                  value: "h2",
                  i18nTitleKey: "inputs.portable-text.style.h2",
                },
                {
                  title: "Heading 3",
                  value: "h3",
                  i18nTitleKey: "inputs.portable-text.style.h3",
                },
                {
                  title: "Heading 4",
                  value: "h4",
                  i18nTitleKey: "inputs.portable-text.style.h4",
                },
                {
                  title: "Heading 5",
                  value: "h5",
                  i18nTitleKey: "inputs.portable-text.style.h5",
                },
                {
                  title: "Heading 6",
                  value: "h6",
                  i18nTitleKey: "inputs.portable-text.style.h6",
                },
                {
                  title: "Quote",
                  value: "blockquote",
                  i18nTitleKey: "inputs.portable-text.style.quote",
                },
              ],
            },
            preview: {},
          },
        },
        {
          name: "listItem",
          type: {
            jsonType: "string",
            type: {
              name: "string",
              title: "String",
              type: null,
              jsonType: "string",
            },
            name: "string",
            title: "List type",
            options: {
              list: [
                {
                  title: "Bulleted list",
                  value: "bullet",
                  i18nTitleKey: "inputs.portable-text.list-type.bullet",
                },
                {
                  title: "Numbered list",
                  value: "number",
                  i18nTitleKey: "inputs.portable-text.list-type.number",
                },
              ],
            },
            preview: {},
          },
        },
        {
          name: "markDefs",
          type: {
            jsonType: "array",
            type: {
              name: "array",
              type: null,
              jsonType: "array",
              of: [],
            },
            name: "array",
            title: "Mark definitions",
            of: [
              {
                jsonType: "object",
                type: {
                  name: "object",
                  title: "Object",
                  type: null,
                  jsonType: "object",
                },
                name: "link",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: {
                      jsonType: "string",
                      type: {
                        name: "url",
                        title: "Url",
                        type: null,
                        jsonType: "string",
                      },
                      name: "url",
                      title: "Link",
                      description: "A valid web, email, phone, or relative link.",
                      preview: {},
                    },
                  },
                ],
                i18nTitleKey: "inputs.portable-text.annotation.link",
                options: {
                  modal: {
                    type: "popover",
                  },
                },
                orderings: [],
                fieldsets: [
                  {
                    single: true,
                    field: {
                      name: "href",
                      type: {
                        jsonType: "string",
                        type: {
                          name: "url",
                          title: "Url",
                          type: null,
                          jsonType: "string",
                        },
                        name: "url",
                        title: "Link",
                        description: "A valid web, email, phone, or relative link.",
                        preview: {},
                      },
                    },
                  },
                ],
                groups: [],
                preview: {
                  select: {
                    href: "href",
                  },
                },
              },
            ],
          },
        },
        {
          name: "level",
          type: {
            jsonType: "number",
            type: {
              name: "number",
              title: "Number",
              type: null,
              jsonType: "number",
            },
            name: "number",
            title: "Indentation",
            preview: {},
          },
        },
      ],
      preview: {
        select: {},
      },
    },
  ],
}
