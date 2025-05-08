import {User} from "@supabase/supabase-js"

import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

import type {Database} from "@/types/supabase"

type HeaderProps = {
  user: User | null
  userRole: Database["public"]["Enums"]["user_role"] | null | undefined
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
