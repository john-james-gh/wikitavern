import Link from "next/link"

export default function NotFound() {
  return (
    <section className="p-2">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </section>
  )
}
