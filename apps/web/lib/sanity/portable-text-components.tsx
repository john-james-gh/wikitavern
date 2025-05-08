import {urlFor} from "./image"
import {PortableTextComponents} from "next-sanity"
import Image from "next/image"

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="not-prose h-auto w-full rounded-lg"
          src={urlFor(props.value).width(600).height(400).quality(80).auto("format").url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
  },
}
