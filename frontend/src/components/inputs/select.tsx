import styles from './styles.module.scss';

import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

type TOptions = {
	label: string;
	value: string;
};

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	className?: string;
	options: TOptions[];
}

const Select = ({ label, className, options, ...rest }: ISelect) => {
	const ref = useRef(null);
	const isFocused = useClickOutside(ref);

	return (
		<div
			ref={ref}
			className={`${styles.container} ${className ? className : null}`}>
			{label ? <label>{label}</label> : null}

			<select className={isFocused ? styles.focused : ''} {...rest}>
				{options.map((opt, i) => (
					<option key={i} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
