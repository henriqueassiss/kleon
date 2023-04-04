import { createContext, useEffect, useState } from 'react';

type TBlurContext = {
	isFocused: boolean;
	handleFocus: (value: boolean) => void;
};

export const BlurContext = createContext({} as TBlurContext);

const BlurProvider = ({ children }) => {
	const [isFocused, setIsFocused] = useState(true);

	const handleFocus = (value: boolean) => setIsFocused(value);

	useEffect(() => {
		const body = document.getElementsByTagName('body');
		if (!isFocused) {
			body[0].classList.add('hidden');
		} else {
			body[0].classList.remove('hidden');
		}
	}, [isFocused]);

	return (
		<BlurContext.Provider
			value={{
				isFocused,
				handleFocus,
			}}>
			{children}
		</BlurContext.Provider>
	);
};

export default BlurProvider;
