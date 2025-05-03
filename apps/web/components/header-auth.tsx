import Link from "next/link"
import {Button} from "@workspace/ui/components/button"
import {createClient} from "@/lib/supabase/server"
import {signOutAction} from "@/actions/auth"

export async function HeaderAuth() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  return user ? (
    <div className="flex items-center gap-4 pb-2 px-2">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2 pb-4 px-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  )
}
