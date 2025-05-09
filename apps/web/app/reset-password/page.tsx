import {redirect} from "next/navigation"

import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {Separator} from "@workspace/ui/components/separator"

import {resetPasswordAction} from "@/actions/auth"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"
import {createClient} from "@/lib/supabase/server"

export default async function ResetPassword(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams

  const supabase = await createClient()

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/sign-in")
  }

  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Reset password</h1>
        <p className="text-foreground/60 text-sm">Please enter your new password below.</p>
      </section>
      <Separator />
      <form className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New password</Label>
          <Input type="password" name="password" placeholder="New password" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input type="password" name="confirmPassword" placeholder="Confirm password" required />
        </div>
        <SubmitButton formAction={resetPasswordAction}>Reset password</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
