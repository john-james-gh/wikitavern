"use client"

import {ThemeProvider as NextThemesProvider} from "next-themes"
import * as React from "react"

import {SidebarProvider} from "@workspace/ui/components/sidebar"

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SidebarProvider>{children}</SidebarProvider>
    </NextThemesProvider>
  )
}
