import {User} from "@supabase/supabase-js"

import {Separator} from "@workspace/ui/components/separator"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"

import type {Database} from "@/types/supabase"

import {AppBreadcrumb} from "./app-breadcrumb"

type HeaderProps = {
  user: User | null
  userRole: Database["public"]["Enums"]["user_role"] | null | undefined
}

export async function Header({user, userRole}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <SidebarTrigger className="size-4" />
        <Separator orientation="vertical" />
        <AppBreadcrumb />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <span>👋 Hey, {user ? user.email : "there"}!</span>
        <Separator orientation="vertical" />
        <span className="text-muted-foreground text-sm">
          {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "User"}
        </span>
      </div>
    </header>
  )
}
