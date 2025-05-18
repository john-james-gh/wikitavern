import Link from "next/link"
import {redirect} from "next/navigation"

import {Button} from "@workspace/ui/components/button"

import {signOutAction} from "@/actions/auth"
import {client} from "@/lib/sanity/client"
import {PAGES_BY_USER_QUERY} from "@/lib/sanity/queries"
import {createClient} from "@/lib/supabase/server"

export const metadata = {
  title: "Profile | WikiTavern",
  description: "The fastest way to build apps with Next.js and Supabase",
}

export async function getPendingSubmissions(userId: string) {
  const supabase = await createClient()

  const {data, error} = await supabase
    .from("wiki_submissions")
    .select("*")
    .eq("submitted_by", userId)
    .eq("status", "pending")

  if (error) {
    console.error(error)
    throw new Error("Failed to fetch pending submissions")
  }

  return data
}

async function getPagesByUser(userId: string) {
  const data = await client.fetch(PAGES_BY_USER_QUERY, {userId})
  return data
}

async function getUser() {
  const supabase = await createClient()

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    return redirect("/sign-in")
  }

  if (!user) {
    console.warn("No user found")
    return redirect("/sign-in")
  }

  return user
}

export default async function Page() {
  const user = await getUser()

  const pendingSubmissionsData = getPendingSubmissions(user.id)
  const pagesByUserData = getPagesByUser(user.id)

  const [pendingSubmissions, pagesByUser] = await Promise.all([pendingSubmissionsData, pagesByUserData])

  return (
    <main className="flex flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>👤 Your WikiTavern Profile</h1>
        <p>
          <strong>Wikitavern</strong> is a clean, ad-free, fan-powered wiki platform. Built for contributors
          who care about the stories they tell — without the clutter of ads or corporate ownership.
        </p>
      </section>

      <section>
        <form>
          <Button type="submit" variant={"outline"} formAction={signOutAction}>
            Sign out
          </Button>
        </form>
      </section>

      <article className="prose dark:prose-invert">
        <h2>🚀 Your Published Wikis</h2>
        {pagesByUser?.length ? (
          <ul>
            {pagesByUser.map((page) => (
              <li key={page._id}>
                <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No wikis yet!</p>
        )}
      </article>

      <article className="prose dark:prose-invert">
        <h2>🚀 Your Pending Wikis</h2>
        {pendingSubmissions?.length ? (
          <ul>
            {pendingSubmissions.map((submission) => (
              <li key={submission.id}>{submission.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No pending wikis yet!</p>
        )}
      </article>
    </main>
  )
}
