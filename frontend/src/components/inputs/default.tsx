import styles from './styles.module.scss';

import { useState } from 'react';

interface IDefault extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
}

const Default = ({ label, className, ...rest }: IDefault) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(!isFocused);

	return (
		<div className={`${styles.container} ${className ? className : null}`}>
			{label ? <label>{label}</label> : null}

			<input
				onBlur={handleFocus}
				onFocus={handleFocus}
				className={isFocused ? styles.focused : ''}
				{...rest}
			/>
		</div>
	);
};

export default Default;
