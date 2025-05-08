import {resetPasswordAction} from "@/actions/auth"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"
import {createClient} from "@/lib/supabase/server"
import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {redirect} from "next/navigation"

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
    <form className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-foreground/60 text-sm">Please enter your new password below.</p>
      <Label htmlFor="password">New password</Label>
      <Input type="password" name="password" placeholder="New password" required />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input type="password" name="confirmPassword" placeholder="Confirm password" required />
      <SubmitButton formAction={resetPasswordAction}>Reset password</SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  )
}
