import {create} from "zustand"

import type {Database} from "@/types/supabase"

interface WikiStore {
  wiki: Database["public"]["Tables"]["wiki_submissions"]["Row"]
  setWiki: (wiki: Partial<Database["public"]["Tables"]["wiki_submissions"]["Row"]>) => void
  resetWiki: () => void
}

const initialWikiState: Database["public"]["Tables"]["wiki_submissions"]["Row"] = {
  id: "",
  title: "",
  slug: "",
  category_id: null,
  tag_ids: null,
  requested_category: null,
  requested_tags: null,
  content: "",
  created_at: "",
  featured: false,
  moderated_at: "",
  moderated_by: "",
  status: "pending",
  submitted_by: "",
  submitted_username: "",
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
