import {User} from "@supabase/supabase-js"

import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

type HeaderProps = {
  user: User | null
  userRole: string | null
}

export async function Header({user, userRole}: HeaderProps) {
  return (
    <header className="flex items-center gap-4">
      <SidebarTrigger className="size-4" />
      <Separator orientation="vertical" />
      <span>Hey, {user ? user.email : "there"}!</span>
      <Separator orientation="vertical" />
      <span className="text-muted-foreground text-sm">
        {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "User"}
      </span>
    </header>
  )
}
