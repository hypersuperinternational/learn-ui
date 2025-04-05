import { create } from 'zustand';

interface ItemStoreProps {
  items: any[]
  loading: boolean
  setItems: (any) => void
  appendItems: (items: any[]) => void
  setLoading: (loading: boolean) => void
}

const useItemStore = create<ItemStoreProps>((set) => ({
  items: [],
  loading: false,
  setItems: (items: any[]) => set({ items }),
  appendItems: (newItems) => set((state) => ({ items: [...state.items, ...newItems] })),
  setLoading: (loading: boolean) => set({ loading })
}))

export default useItemStore