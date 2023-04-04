import Blur from '@/components/blur';
import Cookies from '@/components/cookies';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { BlurContext } from '@/contexts/blur';
import { CookiesContext } from '@/contexts/cookies';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useContext } from 'react';

type TMain = React.HTMLAttributes<HTMLDivElement>;

const Main = ({ children }: TMain) => {
	const { isFocused } = useContext(BlurContext);
	const { shouldShow } = useContext(CookiesContext);

	return (
		<>
			<Header />
			{children}
			<Footer />
			{isFocused ? null : <Blur />}
			{shouldShow ? <Cookies /> : null}
		</>
	);
};

export default Main;
