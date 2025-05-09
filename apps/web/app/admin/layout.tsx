import {PropsWithChildren} from "react"

import {encodedRedirect} from "@/lib/supabase/encoded-redirect"
import {createClient} from "@/lib/supabase/server"

export default async function AdminLayout({children}: Required<PropsWithChildren>) {
  const supabase = await createClient()

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("User is not signed in.")
    return encodedRedirect("error", "/sign-in", "You must be signed in to access this page.")
  }

  const {data, error} = await supabase.from("user_roles").select("role").eq("user_id", user.id).single()

  if (error) {
    console.error("Error fetching user role:", error)
    return encodedRedirect("error", "/sign-in", "Error fetching user role.")
  }

  if (!data || !["admin"].includes(data.role)) {
    console.error("User does not have the required role:", data)
    return encodedRedirect("error", "/sign-in", "You do not have permission to access this page.")
  }

  return <>{children}</>
}
