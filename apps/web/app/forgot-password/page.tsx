import Link from "next/link"

import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {Separator} from "@workspace/ui/components/separator"

import {forgotPasswordAction} from "@/actions/auth"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"

export default async function ForgotPassword(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams
  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Reset Password</h1>
        <p className="text-foreground/60 text-sm">Please enter your email below to reset your password.</p>
        <p className="text-secondary-foreground text-sm">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </section>
      <Separator />
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
        </div>
        <SubmitButton formAction={forgotPasswordAction}>Reset Password</SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
