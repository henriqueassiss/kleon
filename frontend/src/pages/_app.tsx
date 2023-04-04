import Main from '@/components/layouts/main';
import AuthProvider from '@/contexts/auth';
import '@/styles/index.scss';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import BlurProvider from '@/contexts/blur';
import CookiesProvider from '@/contexts/cookies';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<AuthProvider>
					<BlurProvider>
						<CookiesProvider>
							<Main>
								<Component {...pageProps} />
							</Main>
							<Toaster />
						</CookiesProvider>
					</BlurProvider>
				</AuthProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}
