"use client"

import {usePathname} from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import Link from "next/link"

const exploreItems = [
  {emoji: "🏠", label: "Home", url: "/"},
  {emoji: "📄", label: "All Wikis", url: "/wiki"},
  {emoji: "📂", label: "Categories", url: "/category"},
  {emoji: "🏷️", label: "Tags", url: "/tag"},
]

const aboutItems = [
  {emoji: "ℹ️", label: "About", url: "/about"},
  {emoji: "❤️", label: "Donate", url: "/donate"},
]

export function AppSidebar() {
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
          <SidebarGroupLabel>About</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aboutItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild data-state={pathname === item.url ? "active" : undefined}>
                    <Link href={item.url}>
                      <span className="mr-2 text-lg">{item.emoji}</span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
