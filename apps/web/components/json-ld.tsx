import {WebPage, WithContext} from "schema-dts"

const generatePageData = (): WithContext<WebPage> => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
})

export function WebPageJsonLd() {
  const data = generatePageData()

  return (
    <section className="container mx-auto flex flex-col gap-8 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />
      {/* ...the rest of the component */}
    </section>
  )
}
