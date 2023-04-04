import { AuthContext } from '@/contexts/auth';
import Toast from '@/components/toast';
import { useDefaultApiRequest } from '@/hooks/useApiRequest';
import { ValidateBasicPassword, ValidateEmail } from '@/utils/Validator';
import Router from 'next/router';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

const useSignIn = () => {
	const { isAuthenticated, authenticate } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const { isLoading, makeRequest } = useDefaultApiRequest(
		'user/authenticate',
		{
			email,
			password,
		},
	);

	useEffect(() => {
		if (isAuthenticated) Router.push('/');
	}, [isAuthenticated]);

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleVisibility = () => setIsVisible(!isVisible);

	const handleSignIn = async (e: FormEvent) => {
		e.preventDefault();

		if (!ValidateEmail(email) || !ValidateBasicPassword(password)) {
			Toast({
				message:
					'Ops... Houve algum erro, verifique se todos os campos estão preenchidos corretamente.',
				type: 'error',
			});
			return;
		}

		const { success, data } = await makeRequest();

		if (!success) {
			Toast({
				message:
					'Ops... Houve algum erro, verifique se todos os campos estão preenchidos corretamente.',
				type: 'error',
			});
			return;
		}

		Toast({
			message: 'Você acessou a sua conta, seja bem-vindo novamente!',
			type: 'success',
		});

		authenticate(data);
	};

	return {
		email,
		password,
		isVisible,
		handleEmail,
		handlePassword,
		handleVisibility,
		handleSignIn,
		isLoading,
	};
};

export default useSignIn;
