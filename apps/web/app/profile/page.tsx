import Link from "next/link"
import {redirect} from "next/navigation"

import {Button} from "@workspace/ui/components/button"

import {signOutAction} from "@/actions/auth"
import {sanityFetch} from "@/lib/sanity/live"
import {PAGES_BY_USER_QUERY} from "@/lib/sanity/queries"
import {createClient} from "@/lib/supabase/server"

export const metadata = {
  title: "Profile | WikiTavern",
  description: "The fastest way to build apps with Next.js and Supabase",
}

export default async function Page() {
  const supabase = await createClient()

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/sign-in")
  }

  const {data} = await sanityFetch({query: PAGES_BY_USER_QUERY, params: {userId: user.id}})

  return (
    <main className="prose dark:prose-invert flex flex-col">
      <h1>👤 Your WikiTavern Profile</h1>
      <p>
        <strong>Wikitavern</strong> is a clean, ad-free, fan-powered wiki platform. Built for contributors who
        care about the stories they tell — without the clutter of ads or corporate ownership.
      </p>
      <form>
        <Button type="submit" variant={"outline"} formAction={signOutAction}>
          Sign out
        </Button>
      </form>

      <article>
        <h2>🚀 Your Wikis</h2>
        {data?.length ? (
          <ul>
            {data.map((page) => (
              <li key={page._id}>
                <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No wikis yet!</p>
        )}
      </article>
    </main>
  )
}
