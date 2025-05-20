import Link from "next/link"
import {redirect} from "next/navigation"

import {Button} from "@workspace/ui/components/button"
import {Separator} from "@workspace/ui/components/separator"

import {signOutAction} from "@/actions/auth"
import {DataTable} from "@/components/data-table"
import {cmsColumns, dbColumns} from "@/components/wiki-table-columns"
import {client} from "@/lib/sanity/client"
import {PAGES_BY_USER_QUERY} from "@/lib/sanity/queries"
import {createClient} from "@/lib/supabase/server"

export const metadata = {
  title: "Profile | WikiTavern",
  description: "The fastest way to build apps with Next.js and Supabase",
}

async function getPendingSubmissions(userId: string) {
  const supabase = await createClient()

  const {data, error} = await supabase.from("wiki_submissions").select("*").eq("submitted_by", userId)

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
    <main className="flex flex-col gap-4 max-w-[65ch]">
      <section className="prose dark:prose-invert">
        <h1>👤 Your WikiTavern Profile</h1>
        <p>
          <strong>Wikitavern</strong> is a clean, ad-free, fan-powered wiki platform. Built for contributors
          who care about the stories they tell — without the clutter of ads or corporate ownership.
        </p>
      </section>

      <Separator />

      <section className="flex justify-between items-center">
        <p>Email: {user.email}</p>
        <form>
          <Button type="submit" variant={"outline"} formAction={signOutAction}>
            Sign out
          </Button>
        </form>
      </section>

      <Separator />

      <article className="flex flex-col gap-4">
        <div className="prose dark:prose-invert">
          <h3>🚀 Your Published Wikis</h3>
        </div>
        {pagesByUser?.length ? (
          <DataTable columns={cmsColumns} data={pagesByUser} />
        ) : (
          <p className="text-muted-foreground">No wikis yet!</p>
        )}
      </article>

      <article className="flex flex-col gap-4">
        <div className="prose dark:prose-invert">
          <h3>🚀 Your Submitted Wikis</h3>
        </div>
        {pendingSubmissions?.length ? (
          <DataTable columns={dbColumns} data={pendingSubmissions} />
        ) : (
          <p className="text-muted-foreground">No pending wikis yet!</p>
        )}
      </article>
    </main>
  )
}
