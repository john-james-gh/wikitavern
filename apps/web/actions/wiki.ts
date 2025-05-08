"use server"

import {htmlToBlocks} from "@portabletext/block-tools"
import DOMPurify from "isomorphic-dompurify"
import {JSDOM} from "jsdom"
import {micromark} from "micromark"

import {blockContentType} from "@/lib/sanity/block-content-type"
import {encodedRedirect} from "@/lib/supabase/encoded-redirect"
import {createClient} from "@/lib/supabase/server"
import type {Json} from "@/types/supabase"

function markdownToBlocks(md: string) {
  const html = micromark(md)
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlString) => new JSDOM(htmlString).window.document,
  })
}

export const submitWikiAction = async (formData: FormData) => {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return encodedRedirect("error", "/sign-in", "You must be signed in to submit a Wiki")
  }

  const title = formData.get("title")?.toString().trim()
  const slug = formData.get("slug")?.toString().trim()
  const content = formData.get("content")?.toString().trim()

  if (!title || !slug || !content) {
    return encodedRedirect("error", "/submit-wiki", "Fields are required")
  }

  const safeContent = DOMPurify.sanitize(content)
  const blocks = markdownToBlocks(safeContent)
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
    return encodedRedirect("error", "/submit-wiki", error.message)
  }

  return encodedRedirect(
    "success",
    "/submit-wiki",
    "Thanks for submitting a Wiki! Hang tight while a moderator reviews it. You can track progress on your profile page.",
  )
}
