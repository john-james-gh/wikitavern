"use client"

import {usePathname} from "next/navigation"
import {useTheme} from "next-themes"
import {useEffect} from "react"

export default function WikiLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const {setTheme} = useTheme()

  console.log("pathname", pathname)

  useEffect(() => {
    if (pathname.startsWith("/wiki/alien")) {
      setTheme("theme-alien")
    } else if (pathname.startsWith("/wiki/residentevil")) {
      setTheme("theme-residentevil")
    } else {
      setTheme("system")
    }
  }, [pathname, setTheme])

  return <>{children}</>
}
