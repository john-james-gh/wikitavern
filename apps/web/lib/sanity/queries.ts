import {defineQuery} from "next-sanity"

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
  content,
  category->{_id, title, slug},
  tags[]->{_id, title, slug},
  publishedAt,
  updatedAt
}`)

export const PAGES_SLUGS_QUERY = defineQuery(`*[_type == "page" && defined(slug.current)]{
  title,
  "slug": slug.current,
}`)

export const FEATURED_PAGES_QUERY = defineQuery(`*[
  _type == "page" 
  && defined(slug.current)
  && featured == true 
] | order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  updatedAt
}`)

export const RECENTLY_UPDATED_PAGES_QUERY = defineQuery(`*[
  _type == "page"
  && defined(slug.current)
] | order(updatedAt desc)[0...6]{
  _id,
  title,
  slug,
  updatedAt
}`)

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["page", "post"] && defined(slug.current)] {
      "href": select(
        _type == "page" => "/" + slug.current,
        _type == "post" => "/posts/" + slug.current,
        slug.current
      ),
      _updatedAt
  }
  `)
