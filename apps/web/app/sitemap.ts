import {client} from "@/lib/sanity/client"
import {SITEMAP_QUERY} from "@/lib/sanity/queries"
import {MetadataRoute} from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(SITEMAP_QUERY)

    if (!paths) {
      return []
    }

    const baseUrl = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    return paths.map((path) => ({
      url: new URL(path.href!, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    }))
  } catch (error) {
    console.error("Failed to generate sitemap:", error)
    return []
  }
}
