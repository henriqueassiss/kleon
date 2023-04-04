import styles from './styles.module.scss';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useState } from 'react';

interface IPassword extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	isVisible: boolean;
	onClick: () => void;
}

const Password = ({
	label,
	className,
	isVisible,
	onClick,

	...rest
}: IPassword) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(!isFocused);

	return (
		<div className={`${styles.container} ${className ? className : null}`}>
			{label ? <label>{label}</label> : null}

			<input
				onBlur={handleFocus}
				onFocus={handleFocus}
				type={isVisible ? 'text' : 'password'}
				className={isFocused ? styles.focused : ''}
				{...rest}
			/>

			{isVisible ? (
				<IoEyeOffOutline
					size="1.375rem"
					color="#697586"
					onClick={onClick}
					className={styles.icon}
				/>
			) : (
				<IoEyeOutline
					size="1.375rem"
					color="#697586"
					onClick={onClick}
					className={styles.icon}
				/>
			)}
		</div>
	);
};

export default Password;
