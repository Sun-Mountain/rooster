'use client'

import { type ReactNode, createContext, useState, useContext } from 'react';
import { useStore } from 'zustand';

import { type CartStore, createCartStore } from '@/stores/cart-store';

export type CartStoreApi = typeof createCartStore;

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export interface CartStoreProviderProps {
  children: ReactNode
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const [cartStore] = useState<CartStoreApi>(() => createCartStore);

  return (
    <CartStoreContext.Provider value={cartStore}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (state: CartStore) => T): T => {
  const cartStore = useContext(CartStoreContext);
  if (!cartStore) {
    throw new Error('useCartStore must be used within a CartStoreProvider');
  }
  return useStore(cartStore, selector);
};