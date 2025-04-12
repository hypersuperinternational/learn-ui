import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum PAPER_DATABASES {
  core = 'core_paper',
  arxiv = 'n8n_table',
  eup = 'europe_paper'
}

interface UiStoreProps {
  aiHeadlines: boolean
  paperDatabase: PAPER_DATABASES
  paperOpen: boolean
  setAiHeadlines: (aiHeadlines: boolean) => void
  setPaperDatabase: (paperDatabase: PAPER_DATABASES) => void
  setPaperOpen: (paperOpen: boolean) => void // <-- setter for new prop
}

const useUiStore = create<UiStoreProps>()(
  persist(
    (set) => ({
      aiHeadlines: true,
      paperDatabase: PAPER_DATABASES.core,
      paperOpen: false,
      setAiHeadlines: (aiHeadlines: boolean) => set({ aiHeadlines }),
      setPaperDatabase: (paperDatabase: PAPER_DATABASES) => set({ paperDatabase }),
      setPaperOpen: (paperOpen: boolean) => set({ paperOpen: paperOpen }),
    }),
    {
      name: 'ui-settings',
      partialize: (state) => ({
        aiHeadlines: state.aiHeadlines,
        paperDatabase: state.paperDatabase,
      }),
    }
  )
)

export default useUiStore
