"use server"

import {writeClient} from "@/lib/sanity/client"
import {z} from "zod"

export const ContributionSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content cannot be empty"),
  category: z.string().optional(),
  requestedCategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  requestedTags: z.array(z.string()).optional(),
})

export type ContributionInput = z.infer<typeof ContributionSchema>

export interface FormActionResponse {
  message: string
  errors?: Record<string, string>
}

export async function createPage(
  _currentState: FormActionResponse,
  data: ContributionInput,
): Promise<FormActionResponse> {
  const parseResult = ContributionSchema.safeParse(data)

  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      message: "validation_error",
      errors: Object.fromEntries(
        Object.entries(errors).map(([key, val]) => [key, val?.[0] || "Invalid input"]),
      ),
    }
  }

  const {slug, title, content, category, requestedCategory, tags, requestedTags} = parseResult.data

  try {
    await writeClient.create({
      _type: "page",
      title,
      slug: {current: slug},
      content: [
        {
          _type: "block",
          style: "normal",
          children: [{_type: "span", text: content}],
        },
      ],
      category: category ? {_type: "reference", _ref: category} : undefined,
      requestedCategory: requestedCategory || undefined,
      tags: tags?.map((tagId) => ({_type: "reference", _ref: tagId})) || [],
      requestedTags: requestedTags || [],
      status: "pending",
      submittedAt: new Date().toISOString(),
    })

    return {message: "success"}
  } catch (error) {
    console.error("Sanity write error:", error)
    return {message: "sanity_error"}
  }
}
