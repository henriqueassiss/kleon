import Image from 'next/image';
import styles from './styles.module.scss';
import loader from '@public/svgs/Loader.svg';

interface IDefault extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	theme: 'blue' | 'white' | 'white2';
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

const Button = ({
	theme,
	className = '',
	disabled = false,
	isLoading = false,
	children,
	...rest
}: IDefault) => {
	return (
		<button
			className={`${styles.container} ${styles[theme]} ${className}`}
			disabled={isLoading || disabled}
			{...rest}>
			{isLoading ? (
				<Image className={styles.img} src={loader} alt="Carregando" />
			) : (
				children
			)}
		</button>
	);
};

export default Button;
