import Input from '@/components/inputs/default';
import Wrapper from '@/components/layouts/wrapper';
import Button from '@/components/button';
import styles from '@/styles/pages/auth.module.scss';
import useRecoverPassword from '@/hooks/pages/recoverPassword';

const RecoverPassword = () => {
	const { email, handleEmail, handleRecoverPassword, isLoading } =
		useRecoverPassword();

	return (
		<main>
			<Wrapper className={styles.container}>
				<h2>Recuperar Senha</h2>

				<p className={styles.description}>
					Preencha seu e-mail no campo
					<br />
					abaixo para recuperar sua senha.
				</p>

				<form onSubmit={handleRecoverPassword}>
					<Input
						value={email}
						label="E-mail"
						onChange={handleEmail}
						placeholder="Digite seu e-mail"
					/>

					<Button theme="blue" isLoading={isLoading}>
						Recuperar Senha
					</Button>
				</form>
			</Wrapper>
		</main>
	);
};

export default RecoverPassword;
