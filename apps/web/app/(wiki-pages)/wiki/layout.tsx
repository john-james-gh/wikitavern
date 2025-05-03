"use client"

import {usePathname} from "next/navigation"
import {useTheme} from "next-themes"
import {useEffect} from "react"

export default function WikiLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const {setTheme} = useTheme()

  useEffect(() => {
    if (pathname.startsWith("/wiki/xenomorph-lifecycle")) {
      setTheme("dark")
    }
  }, [pathname, setTheme])

  return <>{children}</>
}
