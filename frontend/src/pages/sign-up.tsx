import Input from '@/components/inputs/default';
import Password from '@/components/inputs/password';
import Wrapper from '@/components/layouts/wrapper';
import Button from '@/components/button';
import styles from '@/styles/pages/auth.module.scss';
import useSignUp from '@/hooks/pages/signUp';

const SignUp = () => {
	const {
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
	} = useSignUp();

	return (
		<main>
			<Wrapper className={styles.container}>
				<h2>Criar Conta</h2>

				<p className={styles.description}>
					Preencha suas informações nos campos
					<br />
					abaixo para criar sua conta.
				</p>

				<form onSubmit={handleSignUp}>
					<Input
						label="Nome"
						value={name}
						onChange={handleName}
						placeholder="Digite seu nome"
					/>

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

					<Button theme="blue" isLoading={isLoading}>
						Cadastrar
					</Button>
				</form>
			</Wrapper>
		</main>
	);
};

export default SignUp;
