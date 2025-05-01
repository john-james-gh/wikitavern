import {createClient} from "next-sanity"

import {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION, SANITY_API_TOKEN} from "@/config/environment"

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const writeClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Always false for mutations
  token: SANITY_API_TOKEN, // Needed for write access!
})
