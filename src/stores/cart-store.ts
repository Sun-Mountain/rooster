import { createStore } from 'zustand/vanilla';

export type CartState = {
  items: {
    lineItemId: string;
    lineItem: string;
    price: number;
    quantity: number;
    instanceId?: string;
    instanceStartTime?: string;
  }[];
}

export type CartActions = {
  setCartItems: (items: CartState['items']) => void;
  addToCart: (item: CartState['items'][0]) => void;
  removeFromCart: (lineItemId: string) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;

export const defaultCartState: CartState = {
  items: [],
};

export const createCartStore = createStore<CartStore>((set) => ({
  ...defaultCartState,
  setCartItems: (items) => set({ items }),
  addToCart: (item) => set((state) => {
    const existingItemIndex = state.items.findIndex(i => i.lineItemId === item.lineItemId);
    if (existingItemIndex !== -1) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      return { items: updatedItems };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (lineItemId) => set((state) => ({
    items: state.items.filter(item => item.lineItemId !== lineItemId),
  })),
  clearCart: () => set({ items: [] }),
}));