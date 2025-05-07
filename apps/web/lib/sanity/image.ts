import createImageUrlBuilder from "@sanity/image-url"
import {SanityImageSource} from "@sanity/image-url/lib/types/types"

import {SanityConfig} from "@/config/environment"

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({projectId: SanityConfig.projectId, dataset: SanityConfig.dataset})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
