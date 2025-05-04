import {User} from "@supabase/supabase-js"
import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

type HeaderProps = {
  user: User | null
}

export async function Header({user}: HeaderProps) {
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
