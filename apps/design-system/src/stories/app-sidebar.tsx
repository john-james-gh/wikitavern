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

import {Home, Inbox} from "lucide-react"
import Link from "next/link"

export type SidebarItem = {
  title: string
  url: string
  icon: React.ElementType
}

export type SidebarGroupData = {
  label: string
  items: SidebarItem[]
}

const defaultGroups: SidebarGroupData[] = [
  {
    label: "Application",
    items: [
      {title: "Home", url: "#", icon: Home},
      {title: "Inbox", url: "#", icon: Inbox},
    ],
  },
]

export type AppSidebarProps = {
  groups?: SidebarGroupData[]
}

export function AppSidebar({groups = defaultGroups}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        {groups.map((group, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
