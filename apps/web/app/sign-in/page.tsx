import Link from "next/link"

import {Input} from "@workspace/ui/components/input"
import {Label} from "@workspace/ui/components/label"
import {Separator} from "@workspace/ui/components/separator"

import {signInAction} from "@/actions/auth"
import {FormMessage, Message} from "@/components/form-message"
import {SubmitButton} from "@/components/submit-button"

export default async function SignIn(props: {searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams
  return (
    <main className="flex max-w-[65ch] flex-col gap-4">
      <section className="prose dark:prose-invert">
        <h1>Sign in</h1>
        <p className="text-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </section>
      <Separator />
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-foreground text-xs underline" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <Input type="password" name="password" placeholder="Your password" required />
        </div>
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </main>
  )
}
