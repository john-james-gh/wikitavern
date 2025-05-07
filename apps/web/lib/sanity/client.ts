import {createClient} from "next-sanity"

import {SanityConfig} from "@/config/environment"

export const client = createClient({
  projectId: SanityConfig.projectId,
  dataset: SanityConfig.dataset,
  apiVersion: SanityConfig.apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const writeClient = createClient({
  projectId: SanityConfig.projectId,
  dataset: SanityConfig.dataset,
  apiVersion: SanityConfig.apiVersion,
  useCdn: false, // Always false for mutations
  token: SanityConfig.apiToken, // Needed for write access!
})
