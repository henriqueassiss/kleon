import { MutableRefObject, useEffect, useState } from 'react';

const useClickOutside = (ref: MutableRefObject<any>) => {
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setIsFocused(false);
			} else {
				setIsFocused(true);
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [ref, isFocused]);

	return isFocused;
};

export default useClickOutside;
