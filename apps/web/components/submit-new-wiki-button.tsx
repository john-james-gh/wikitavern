"use client"

import {useRouter} from "next/navigation"

import {Button} from "@workspace/ui/components/button"

import {useWikiStore} from "@/stores/wiki"

export function SubmitNewWikiButton() {
  const router = useRouter()
  const resetWiki = useWikiStore((state) => state.resetWiki)

  const handleClick = () => {
    resetWiki()
    router.push("/submit-wiki")
  }

  return (
    <Button type="button" onClick={handleClick}>
      Submit another Wiki 🚀
    </Button>
  )
}
