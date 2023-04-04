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
				<h2>Sign Up</h2>

				<p className={styles.description}>
					Fill the fields with your
					<br />
					account info to sign up.
				</p>

				<form onSubmit={handleSignUp}>
					<Input
						label="Name"
						value={name}
						onChange={handleName}
						placeholder="Type your name"
					/>

					<Input
						value={email}
						label="Email"
						onChange={handleEmail}
						placeholder="Type your email"
					/>

					<Password
						label="Password"
						value={password}
						isVisible={isVisible}
						onChange={handlePassword}
						onClick={handleVisibility}
						placeholder="Type your password"
					/>

					<Button theme="blue" isLoading={isLoading}>
						Sign Up
					</Button>
				</form>
			</Wrapper>
		</main>
	);
};

export default SignUp;
