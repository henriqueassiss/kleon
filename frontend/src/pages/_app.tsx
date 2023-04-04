import Main from '@/components/layouts/main';
import AuthProvider from '@/contexts/auth';
import '@/styles/index.scss';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import BlurProvider from '@/contexts/blur';
import CookiesProvider from '@/contexts/cookies';

export default function App({ Component, pageProps }: AppProps) {
	return (
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
	);
}
