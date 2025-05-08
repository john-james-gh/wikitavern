import {Geist, Geist_Mono} from "next/font/google"

import "@workspace/ui/globals.css"

import {AppSidebar} from "@/components/app-sidebar"
import {Header} from "@/components/header"
import {Providers} from "@/components/providers"
import {IsTestEnvironment} from "@/config/environment"
import {SanityLive} from "@/lib/sanity/live"
import {createClient} from "@/lib/supabase/server"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()

  let userRole = null

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (user) {
    const {data, error} = await supabase.from("user_roles").select("role").eq("user_id", user.id).single()
    if (error) {
      console.error("Error fetching user role:", {error})
    }
    userRole = data?.role
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Providers>
          <AppSidebar user={user} userRole={userRole} />
          <div className="flex w-screen flex-col gap-6 p-6">
            <Header user={user} userRole={userRole} />
            {children}
          </div>
        </Providers>
        {IsTestEnvironment ? null : <SanityLive />}
      </body>
    </html>
  )
}
