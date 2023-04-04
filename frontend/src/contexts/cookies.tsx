import { BlurContext } from '@/contexts/blur';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

type TCookiesContext = {
	shouldShow: boolean;
	markAsRead: () => void;
};

export const CookiesContext = createContext({} as TCookiesContext);

const CookiesProvider = ({ children }) => {
	const { handleFocus } = useContext(BlurContext);
	const [shouldShow, setShouldShow] = useState(false);
	const { 'kleon.cookiesPolicyRead': wasRead } = parseCookies();

	useEffect(() => {
		if (!wasRead) {
			handleFocus(false);
			setShouldShow(true);
			return;
		}
	}, [wasRead, shouldShow, handleFocus]);

	const markAsRead = () => {
		setCookie(null, 'kleon.cookiesPolicyRead', '1');
		handleFocus(true);
		setShouldShow(false);
	};
	return (
		<CookiesContext.Provider
			value={{
				shouldShow,
				markAsRead,
			}}>
			{children}
		</CookiesContext.Provider>
	);
};

export default CookiesProvider;
