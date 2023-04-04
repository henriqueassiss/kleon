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
				<h2>Sign In</h2>

				<p className={styles.description}>
					Fill the fields with your
					<br />
					account info to sign in.
				</p>

				<form onSubmit={handleSignIn}>
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

					<Link
						href="/recover-password"
						className={`${linkStyles.container} ${linkStyles.blue}`}>
						Forgot password
					</Link>

					<Button theme="blue" isLoading={isLoading}>
						Sign In
					</Button>
				</form>
			</Wrapper>
		</main>
	);
};

export default SignIn;
