"use server"

import {TypedObject} from "@portabletext/block-tools"
import DOMPurify from "isomorphic-dompurify"

import {blockContentType} from "@/lib/sanity/block-content-type"
import {client, writeClient} from "@/lib/sanity/client"
import {encodedRedirect} from "@/lib/supabase/encoded-redirect"
import {createClient} from "@/lib/supabase/server"
import {markdownToBlocks} from "@/lib/utils/markdown-to-blocks"
import type {Database, Json} from "@/types/supabase"

export const submitWikiAction = async (wiki: Database["public"]["Tables"]["wiki_submissions"]["Row"]) => {
  const {title, slug, content} = wiki
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to submit a Wiki")
  }

  if (!title || !slug || !content) {
    return encodedRedirect("error", "/submit-wiki/error", "Fields are required")
  }

  const safeContent = DOMPurify.sanitize(content as string)
  const blocks = markdownToBlocks(safeContent, blockContentType)
  const contentJson = blocks as unknown as Json

  const {error} = await supabase.from("wiki_submissions").insert({
    title,
    slug,
    content: contentJson,
    submitted_by: user.id,
    submitted_username: user.email,
    requested_category: wiki.requested_category,
    requested_tags: wiki.requested_tags,
    category_id: wiki.category_id,
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/submit-wiki/error", error.message)
  }

  return encodedRedirect(
    "success",
    "/submit-wiki/success",
    "Thanks for submitting a Wiki! Hang tight while a moderator reviews it. You can track progress on your profile page.",
  )
}

export const updateWikiAction = async (wiki: Database["public"]["Tables"]["wiki_submissions"]["Row"]) => {
  const {id, title, slug, content} = wiki
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to update a Wiki")
  }

  if (!id || !title || !slug || !content) {
    return encodedRedirect("error", "/submit-wiki/error", "Fields are required")
  }

  const safeContent = DOMPurify.sanitize(content as string)
  const blocks = markdownToBlocks(safeContent, blockContentType)
  const contentJson = blocks as unknown as Json

  const {error} = await supabase
    .from("wiki_submissions")
    .update({
      title,
      slug,
      content: contentJson,
      updated_at: new Date().toISOString(),
      requested_category: wiki.requested_category,
      requested_tags: wiki.requested_tags,
      category_id: wiki.category_id,
      tag_ids: wiki.tag_ids,
    })
    .eq("id", id)
    .eq("submitted_by", user.id) // Ensure user can only update their own submissions

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/submit-wiki/error", error.message)
  }

  return encodedRedirect(
    "success",
    "/submit-wiki/success",
    "Wiki updated successfully! The changes will be reviewed by a moderator.",
  )
}

export const approveWikiAction = async (
  wiki: Database["public"]["Tables"]["wiki_submissions"]["Row"],
  slug: string,
) => {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to approve a Wiki")
  }

  const categoryDoc = await client.fetch('*[_type == "category" && slug.current == $slug][0]{_id}', {
    slug: wiki.category_id,
  })

  // Fetch all tag docs by slug in a single query
  const tagDocs = wiki.tag_ids?.length
    ? await client.fetch(`*[_type == "tag" && slug.current in $slugs]{_id, slug}`, {slugs: wiki.tag_ids})
    : []

  // Build an ID map for quick lookup
  const tagIdMap = Object.fromEntries(tagDocs.map((tag: any) => [tag.slug.current, tag._id]))

  // Create the base document
  const doc: any = {
    _type: "page",
    title: wiki.title,
    slug: {
      _type: "slug",
      current: wiki.slug,
    },
    content: wiki.content as unknown as TypedObject[],
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    submittedBy:
      wiki.submitted_by && wiki.submitted_username
        ? {
            userId: wiki.submitted_by,
            username: wiki.submitted_username,
          }
        : undefined,
  }

  // Add category reference if it exists
  if (wiki.category_id) {
    doc.category = {
      _type: "reference",
      _ref: categoryDoc._id,
    }
  } else if (wiki.requested_category) {
    doc.requestedCategory = wiki.requested_category
  }

  // Add tag references if they exist
  if (wiki.tag_ids?.length) {
    doc.tags = wiki.tag_ids
      .map(
        (slug) =>
          tagIdMap[slug]
            ? {
                _type: "reference",
                _ref: tagIdMap[slug],
                _key: tagIdMap[slug], // Or slug, if you want, just needs to be unique
              }
            : null, // Optionally filter out slugs that didn't resolve
      )
      .filter(Boolean)
  } else if (wiki.requested_tags?.length) {
    doc.requestedTags = wiki.requested_tags
  }

  await writeClient.create(doc)

  // Update the wiki submission status to approved
  const {error} = await supabase
    .from("wiki_submissions")
    .update({status: "approved", moderated_at: new Date().toISOString(), moderated_by: user.id})
    .eq("id", slug)

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/submit-wiki/error", error.message)
  }

  return encodedRedirect("success", "/submit-wiki/success", "Wiki approved successfully! 🎉")
}
