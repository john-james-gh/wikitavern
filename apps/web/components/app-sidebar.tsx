"use client"

import type {User} from "@supabase/supabase-js"
import Link from "next/link"
import {usePathname} from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"

import type {Database} from "@/types/supabase"

import {ThemeSwitch} from "./theme-switch"

const exploreItems = [
  {emoji: "🏠", label: "Home", url: "/"},
  {emoji: "📄", label: "All Wikis", url: "/wiki"},
  {emoji: "📂", label: "Categories", url: "/category"},
  {emoji: "🏷️", label: "Tags", url: "/tag"},
  {emoji: "📝", label: "Submit Wiki", url: "/submit-wiki"},
]

const aboutItems = [
  {emoji: "ℹ️", label: "About", url: "/about"},
  {emoji: "❤️", label: "Donate", url: "/donate"},
  {emoji: "🛠️", label: "Contribution Guide", url: "/contribute"},
]

const authItems = [
  {emoji: "🔑", label: "Sign In", url: "/sign-in"},
  {emoji: "📝", label: "Sign Up", url: "/sign-up"},
]

const accountItems = [
  {emoji: "👤", label: "Profile", url: "/profile"},
  {emoji: "⚙️", label: "Settings", url: "/settings"},
]

const moderatorItems = [
  {emoji: "🔍", label: "Dashboard", url: "/moderator"},
  {emoji: "🛠️", label: "Pending Wikis", url: "/moderator/pending-wikis"},
]

const adminItems = [
  {
    emoji: "🧑‍⚖️",
    label: "User Management",
    url: "/admin/user-management",
  },
]

type AppSidebarProps = {
  user: User | null
  userRole: Database["public"]["Enums"]["user_role"] | null | undefined
}

export function AppSidebar({user, userRole}: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {exploreItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                    <Link href={item.url}>
                      <span className="mr-2">{item.emoji}</span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user ? (
                <>
                  {accountItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                        <Link href={item.url}>
                          <span className="mr-2">{item.emoji}</span>
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              ) : (
                <>
                  {authItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                        <Link href={item.url}>
                          <span className="mr-2">{item.emoji}</span>
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole && ["admin", "moderator"].includes(userRole) && (
          <SidebarGroup>
            <SidebarGroupLabel>Moderation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {moderatorItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                      <Link href={item.url}>
                        <span className="mr-2">{item.emoji}</span>
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole && ["admin"].includes(userRole) && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                      <Link href={item.url}>
                        <span className="mr-2">{item.emoji}</span>
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>About</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aboutItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.url ? true : undefined}>
                    <Link href={item.url}>
                      <span className="mr-2">{item.emoji}</span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeSwitch />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
