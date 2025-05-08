"use client"

import {type ComponentProps} from "react"
import {useFormStatus} from "react-dom"

import {Button} from "@workspace/ui/components/button"

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
}

export function SubmitButton({children, pendingText = "Submitting...", ...props}: Props) {
  const {pending} = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending} {...props} className="max-w-[150px]" disabled={pending}>
      {pending ? pendingText : children}
    </Button>
  )
}
