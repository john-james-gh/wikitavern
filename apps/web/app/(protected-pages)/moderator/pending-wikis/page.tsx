import {createClient} from "@/lib/supabase/server"
import Link from "next/link"

export default async function PendingWikis() {
  const supabase = await createClient()

  const {data: wikis, error} = await supabase.from("wiki_submissions").select("*").eq("status", "pending")

  if (error) {
    console.error("Error fetching wikis:", error)
    throw new Error("Failed to fetch wikis")
  }

  return (
    <main className="flex flex-col prose dark:prose-invert">
      <h1>📄 Pending Wikis</h1>
      <ul>
        {wikis.map((wiki) => (
          <li key={wiki.id}>
            <Link href={`/moderator/pending-wikis/${wiki.id}`}>{wiki.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
