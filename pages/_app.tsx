import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { AppProvider } from 'contexts/AppContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
