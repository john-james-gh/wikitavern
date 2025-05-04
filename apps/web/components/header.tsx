import {User} from "@supabase/supabase-js"
import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

type HeaderProps = {
  user: User | null
  userRole: string | null
}

export async function Header({user, userRole}: HeaderProps) {
  if (!user) {
    return null
  }

  return (
    <header className="flex items-center gap-4">
      <SidebarTrigger className="size-4" />
      <Separator orientation="vertical" />
      <span>Hey, {user.email}!</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-muted-foreground">
        {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "User"}
      </span>
    </header>
  )
}
