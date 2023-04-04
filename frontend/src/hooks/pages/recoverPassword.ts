import { AuthContext } from '@/contexts/auth';
import Toast from '@/components/toast';
import { useDefaultApiRequest } from '@/hooks/useApiRequest';
import { ValidateEmail } from '@/utils/Validator';
import Router from 'next/router';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

const useSignIn = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const { isLoading, makeRequest } = useDefaultApiRequest(
		'/user/recover-password',
		{
			email,
		},
	);

	useEffect(() => {
		if (isAuthenticated) Router.push('/');
	}, [isAuthenticated]);

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);

	const handleRecoverPassword = async (e: FormEvent) => {
		e.preventDefault();

		if (!ValidateEmail(email)) {
			Toast({
				message:
					'Ops... Houve algum erro, verifique se o seu e-mail está correto.',
				type: 'error',
			});
			return;
		}

		const { success } = await makeRequest();

		if (!success) {
			Toast({
				message:
					'Ops... Houve algum erro, verifique se o seu e-mail está correto.',
				type: 'error',
			});
			return;
		}

		Toast({
			message:
				'Tudo certo, em breve você receberá um e-mail com sua nova senha.',
			type: 'success',
		});

		Router.push('/sign-in');
	};

	return {
		email,
		handleEmail,
		handleRecoverPassword,
		isLoading,
	};
};

export default useSignIn;
