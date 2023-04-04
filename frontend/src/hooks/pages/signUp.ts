import Toast from '@/components/toast';
import { AuthContext } from '@/contexts/auth';
import { useDefaultApiRequest } from '@/hooks/useApiRequest';
import { ValidateEmail, ValidatePassword } from '@/utils/Validator';
import Router from 'next/router';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

const useSignUp = () => {
	const { isAuthenticated, authenticate } = useContext(AuthContext);
	const [isBrazilianDocument, setIsBrazilianDocument] = useState('true');
	const [nationalId, setNationalId] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const { isLoading, makeRequest } = useDefaultApiRequest('/user/create', {
		roleId: 2,
		isBrazilianDocument: isBrazilianDocument === 'true',
		nationalId,
		name,
		email,
		password,
	});

	useEffect(() => {
		if (isAuthenticated) Router.push('/');
	}, [isAuthenticated]);

	const handleName = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleVisibility = () => setIsVisible(!isVisible);

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();

		if (!ValidateEmail(email) || !ValidatePassword(password)) {
			Toast({
				message:
					'Oops... There was an error, check if all fields are filled correctly.',
				type: 'error',
			});
			return;
		}

		const { success, data } = await makeRequest();

		if (!success) {
			Toast({
				message:
					'Oops... There was an error, check if all fields are filled correctly.',
				type: 'error',
			});
			return;
		}

		Toast({
			message: 'You signed up, welcome!',
			type: 'success',
		});

		authenticate(data);
	};

	return {
		isBrazilianDocument,
		nationalId,
		name,
		email,
		password,
		isVisible,
		handleName,
		handleEmail,
		handlePassword,
		handleVisibility,
		handleSignUp,
		isLoading,
	};
};

export default useSignUp;
