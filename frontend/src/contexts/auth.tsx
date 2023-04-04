import { createContext, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';

type TAuthContext = {
	userEmail: string;
	isAuthenticated: boolean;
	authenticate: (authData: TAuthRes) => void;
	signOut: () => void;
};

type TAuthRes = {
	userEmail: string;
	token: string;
};

type TJwt = {
	userEmail: string;
	exp: number;
};

export const AuthContext = createContext({} as TAuthContext);

const AuthProvider = ({ children }) => {
	const { 'kleon.auth': auth } = parseCookies();
	const [userEmail, setUserEmail] = useState<string>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(null);

	useEffect(() => {
		if (!auth) return;

		let authCookie: TAuthRes;
		let decodedJwt: TJwt;
		try {
			authCookie = JSON.parse(auth);
			const jwtBuffer = window.atob(authCookie.token.split('.')[1]);
			decodedJwt = JSON.parse(jwtBuffer);
		} catch {
			signOut();
		}

		if (
			decodedJwt.userEmail !== authCookie.userEmail ||
			decodedJwt.exp * 1000 < Date.now()
		) {
			signOut();
		}

		setUserEmail(() => authCookie.userEmail);
		setIsAuthenticated(() => true);
	}, [auth]);

	const authenticate = (authData: TAuthRes) => {
		const expiresIn = 86400;
		setCookie(null, 'kleon.auth', JSON.stringify(authData), {
			maxAge: expiresIn,
		});
		setUserEmail(() => authData.userEmail);
		setIsAuthenticated(() => true);

		Router.push('/');
	};

	const signOut = () => {
		destroyCookie(null, 'kleon.auth');
		Router.reload();
	};

	return (
		<AuthContext.Provider
			value={{
				userEmail,
				isAuthenticated,
				authenticate,
				signOut,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
