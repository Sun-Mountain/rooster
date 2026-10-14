import type { AppProps } from 'next/app'

import { CartStoreProvider } from '@/providers/cart-provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartStoreProvider>
      <Component {...pageProps} />
    </CartStoreProvider>
  )
}