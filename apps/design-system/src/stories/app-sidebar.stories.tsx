import {AppSidebar, type SidebarGroupData} from "./app-sidebar"
import type {Meta, StoryObj} from "@storybook/react"
import {Calendar, Home, Inbox, Search, Settings} from "lucide-react"

import {SidebarProvider, SidebarTrigger} from "@workspace/ui/components/sidebar"

const meta: Meta<typeof AppSidebar> = {
  title: "App Sidebar",
  component: AppSidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    groups: {
      description: "Array of sidebar groups to display in the sidebar.",
      control: {type: "object"},
      table: {
        type: {summary: "SidebarGroupData[]"},
        defaultValue: {summary: "defaultGroups"},
      },
    },
  },
  decorators: [
    (Story, context) => (
      <SidebarProvider>
        <Story {...context} />
        <main className="p-4">
          <SidebarTrigger />
          <section className="p-2">
            <h1>Main Content Area</h1>
            <p>This is where your app main content would go.</p>
          </section>
        </main>
      </SidebarProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const oneGroup: SidebarGroupData[] = [
  {
    label: "Application",
    items: [
      {title: "Home", url: "#", icon: Home},
      {title: "Inbox", url: "#", icon: Inbox},
    ],
  },
]

export const WithOneGroup: Story = {
  args: {
    groups: oneGroup,
  },
}

const threeGroups: SidebarGroupData[] = [
  {
    label: "Main",
    items: [{title: "Home", url: "#", icon: Home}],
  },
  {
    label: "Productivity",
    items: [
      {title: "Calendar", url: "#", icon: Calendar},
      {title: "Inbox", url: "#", icon: Inbox},
    ],
  },
  {
    label: "Settings",
    items: [{title: "Settings", url: "#", icon: Settings}],
  },
]

export const WithThreeGroups: Story = {
  args: {
    groups: threeGroups,
  },
}

const oneLink: SidebarGroupData[] = [
  {
    label: "Quick",
    items: [{title: "Search", url: "#", icon: Search}],
  },
]

export const WithOneLink: Story = {
  args: {
    groups: oneLink,
  },
}
