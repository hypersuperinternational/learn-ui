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
  appendItems: (newItems) => set((state) => {
    const existingIds = new Set(state.items.map((item) => item.doi));
    const filteredItems = newItems.filter((item) => !existingIds.has(item.doi));
    return { items: [...state.items, ...filteredItems] };
  }),
  setLoading: (loading: boolean) => set({ loading })
}))

export default useItemStore