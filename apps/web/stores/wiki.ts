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
  resetWiki: () => void
}

const initialWikiState: WikiState = {
  title: "",
  slug: "",
  category: "",
  tags: [],
  requestedCategory: "",
  requestedTags: [],
  content: "",
}

export const useWikiStore = create<WikiStore>((set) => ({
  wiki: initialWikiState,
  setWiki: (newWiki) =>
    set((state) => ({
      wiki: {
        ...state.wiki,
        ...newWiki,
      },
    })),
  resetWiki: () => set({wiki: initialWikiState}),
}))
