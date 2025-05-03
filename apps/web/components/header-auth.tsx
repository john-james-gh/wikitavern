import {createClient} from "@/lib/supabase/server"
import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

export async function HeaderAuth() {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <header className="flex items-center gap-4">
      <SidebarTrigger className="size-4" />
      <Separator orientation="vertical" />
      <span>Hey, {user.email}!</span>
    </header>
  )
}
