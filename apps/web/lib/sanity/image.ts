import createImageUrlBuilder from "@sanity/image-url"
import {SanityImageSource} from "@sanity/image-url/lib/types/types"

import {SANITY_PROJECT_ID, SANITY_DATASET} from "@/config/environment"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
