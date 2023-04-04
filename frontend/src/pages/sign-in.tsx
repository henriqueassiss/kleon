import Input from '@/components/inputs/default';
import Password from '@/components/inputs/password';
import Wrapper from '@/components/layouts/wrapper';
import Button from '@/components/button';
import styles from '@/styles/pages/auth.module.scss';
import linkStyles from '@/styles/components/link.module.scss';
import Link from 'next/link';
import useSignIn from '@/hooks/pages/signIn';

const SignIn = () => {
	const {
		email,
		password,
		isVisible,
		handleEmail,
		handlePassword,
		handleVisibility,
		handleSignIn,
		isLoading,
	} = useSignIn();

	return (
		<main>
			<Wrapper className={styles.container}>
				<h2>Acessar Conta</h2>

				<p className={styles.description}>
					Preencha suas informações nos campos
					<br />
					abaixo para acessar sua conta.
				</p>

				<form onSubmit={handleSignIn}>
					<Input
						value={email}
						label="E-mail"
						onChange={handleEmail}
						placeholder="Digite seu e-mail"
					/>

					<Password
						label="Senha"
						value={password}
						isVisible={isVisible}
						onChange={handlePassword}
						onClick={handleVisibility}
						placeholder="Digite sua senha"
					/>

					<Link
						href="/recover-password"
						className={`${linkStyles.container} ${linkStyles.blue}`}>
						Esqueci a senha
					</Link>

					<Button theme="blue" isLoading={isLoading}>
						Entrar
					</Button>
				</form>
			</Wrapper>
		</main>
	);
};

export default SignIn;
