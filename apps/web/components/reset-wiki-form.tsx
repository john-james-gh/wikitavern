"use client"

import {useEffect} from "react"

import {useWikiStore} from "@/stores/wiki"

export function ResetWikiForm() {
  const resetWiki = useWikiStore((state) => state.resetWiki)

  useEffect(() => {
    resetWiki()
  }, [resetWiki])

  return null
}
