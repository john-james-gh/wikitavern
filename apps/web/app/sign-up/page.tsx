import Link from "next/link"

import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {Separator} from "@workspace/ui/components/separator"

import {signUpAction} from "@/actions/auth"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"

export default async function Signup(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Sign up</h1>
        <p className="text-foreground/60 text-sm">
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
          <Input name="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Your password" />
        </div>
        <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          Sign up
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
