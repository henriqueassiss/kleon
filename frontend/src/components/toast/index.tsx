import toast, { ToastOptions } from 'react-hot-toast';

type TToast = {
	message: string;
	type: 'success' | 'error' | 'promise';
};

const Toast = ({ message, type }: TToast) => {
	const theme: ToastOptions = {
		duration: 3000,
		style: {
			padding: '1rem',
			color: '#2e90fa',
		},
		iconTheme: {
			primary: '#2e90fa',
			secondary: '#fcfcfd',
		},
	};

	if (type === 'success') toast.success(message, theme);
	else toast.error(message, theme);
};

export default Toast;
