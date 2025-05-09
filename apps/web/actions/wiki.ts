"use server"

import DOMPurify from "isomorphic-dompurify"

import {blockContentType} from "@/lib/sanity/block-content-type"
import {encodedRedirect} from "@/lib/supabase/encoded-redirect"
import {createClient} from "@/lib/supabase/server"
import {markdownToBlocks} from "@/lib/utils/markdown-to-blocks"
import type {WikiState} from "@/stores/wiki"
import type {Json} from "@/types/supabase"

export const submitWikiAction = async (wiki: WikiState) => {
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

  const safeContent = DOMPurify.sanitize(content)
  const blocks = markdownToBlocks(safeContent, blockContentType)
  const contentJson = blocks as unknown as Json

  const {error} = await supabase.from("wiki_submissions").insert({
    title,
    slug,
    content: contentJson,
    submitted_by: user.id,
    submitted_username: user.user_metadata.username,
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
