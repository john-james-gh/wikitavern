import {defineQuery} from "next-sanity"

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content,
  category->{_id, title, slug},
  tags[]->{_id, title, slug},
  publishedAt,
  updatedAt
}`)

export const PAGES_SLUGS_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`)
