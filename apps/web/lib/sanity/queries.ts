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

export const FEATURED_PAGES_QUERY = defineQuery(`*[
  _type == "page" 
  && featured == true 
] | order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  updatedAt
}`)

export const RECENTLY_UPDATED_PAGES_QUERY = defineQuery(`*[
  _type == "page"
] | order(updatedAt desc)[0...6]{
  _id,
  title,
  slug,
  updatedAt
}`)
