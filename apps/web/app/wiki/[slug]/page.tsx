import type {Metadata, ResolvingMetadata} from "next"

type Props = {
  params: Promise<{id: string}>
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: "...",
    description: "The React Framework for the Web",
  }
}

function Page() {
  return (
    <section>
      <h1>Wiki Page</h1>
      <p>This is a wiki page.</p>
    </section>
  )
}

export default Page
