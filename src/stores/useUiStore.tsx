import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiStoreProps {
  aiHeadlines: boolean
  setAiHeadlines: (aiHeadlines: boolean) => void
}

const useUiStore = create<UiStoreProps>()(
    persist(
      (set) => ({
        aiHeadlines: true,
        setAiHeadlines: (aiHeadlines: boolean) => set({ aiHeadlines }),
      }),
      {
        name: 'ui-settings',
      }
    )
  )

export default useUiStore