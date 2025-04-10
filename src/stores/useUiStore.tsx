import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum PAPER_DATABASES {
  core = 'core_paper',
  arxiv = 'n8n_table'
}

interface UiStoreProps {
  aiHeadlines: boolean
  paperDatabase: PAPER_DATABASES
  setAiHeadlines: (aiHeadlines: boolean) => void
  setPaperDatabase: (paperDatabase: PAPER_DATABASES) => void
}

const useUiStore = create<UiStoreProps>()(
    persist(
      (set) => ({
        aiHeadlines: true,
        paperDatabase: PAPER_DATABASES.core,
        setAiHeadlines: (aiHeadlines: boolean) => set({ aiHeadlines }),
        setPaperDatabase: (paperDatabase: PAPER_DATABASES) => set({ paperDatabase })
      }),
      {
        name: 'ui-settings',
      }
    )
  )

export default useUiStore