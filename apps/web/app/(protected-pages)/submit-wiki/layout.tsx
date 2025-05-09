import {create} from "zustand"

export interface WikiState {
  title: string
  slug: string
  category: string
  tags: string[]
  requestedCategory: string
  requestedTags: string[]
  content: string
}

interface WikiStore {
  wiki: WikiState
  setWiki: (wiki: Partial<WikiState>) => void
}

export const useWikiStore = create<WikiStore>((set) => ({
  wiki: {
    title: "",
    slug: "",
    category: "",
    tags: [],
    requestedCategory: "",
    requestedTags: [],
    content: "",
  },
  setWiki: (newWiki) =>
    set((state) => ({
      wiki: {
        ...state.wiki,
        ...newWiki,
      },
    })),
}))

export default function SubmitWikiLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>
}
