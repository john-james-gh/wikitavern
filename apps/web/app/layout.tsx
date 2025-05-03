import {Geist, Geist_Mono} from "next/font/google"
import "@workspace/ui/globals.css"
import {Providers} from "@/components/providers"
import {SidebarTrigger} from "@workspace/ui/components/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import {SanityLive} from "@/lib/sanity/live"
import {API_MOCKING} from "@/config/environment"
import {HeaderAuth} from "@/components/header-auth"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "WikiTavern",
  description: "The fastest way to build apps with Next.js and Supabase",
}

if (API_MOCKING === "enabled") {
  // We use `require` instead of `import` to load MSW only at runtime in dev.
  // This prevents the mock code from being bundled into the production build.
  console.warn("API mocking is enabled.")
  require("../lib/msw")
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>
          <AppSidebar />
          <main className="p-4">
            <HeaderAuth />
            <SidebarTrigger />
            {children}
          </main>
        </Providers>
        {API_MOCKING === "enabled" ? null : <SanityLive />}
      </body>
    </html>
  )
}
