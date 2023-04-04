import styles from './styles.module.scss';

interface IWrapper extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Wrapper = ({ children, className }: IWrapper) => {
	return (
		<div className={`${styles.container} ${className ? className : ''}`}>
			{children}
		</div>
	);
};

export default Wrapper;
