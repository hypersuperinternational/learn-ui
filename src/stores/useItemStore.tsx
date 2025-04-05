import { create } from 'zustand';

interface ItemStoreProps {
  items: any[]
  setItems: (any) => void
}

const useItemStore = create<ItemStoreProps>((set) => ({
  items: [],
  setItems: (items: any[]) => {
    set({ items })
  }
}))

export default useItemStore