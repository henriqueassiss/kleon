import Link from 'next/link';

import { data } from './mock';

import Wrapper from '@/components/layouts/wrapper';
import styles from './styles.module.scss';
import linkStyles from '@/styles/components/link.module.scss';
import logo from '@public/brand/logo.svg';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/auth';
import { IoMenuOutline } from 'react-icons/io5';

const Header = () => {
	const [visible, setVisible] = useState(false);
	const { isAuthenticated, signOut } = useContext(AuthContext);

	const handleVisibility = () => setVisible(!visible);

	return (
		<header className={styles.container}>
			<Wrapper className={styles.wrapper}>
				<div className={styles.logo}>
					<Image src={logo} alt="Logo" />
				</div>

				<nav className={visible ? styles.visible : ''}>
					<ul className={styles.list}>
						{data.nav.map((link, i) => (
							<li key={i}>
								<Link
									href={link.slug}
									className={`${linkStyles.container} ${linkStyles.white}`}>
									{link.label}
								</Link>
							</li>
						))}
						{isAuthenticated ? (
							<li>
								<button
									onClick={signOut}
									className={`${linkStyles.container} ${linkStyles.white}`}>
									Sair
								</button>
							</li>
						) : (
							<>
								<li>
									<Link
										href="/sign-in"
										className={`${linkStyles.container} ${linkStyles.white}`}>
										Entrar
									</Link>
								</li>
								<li>
									<Link
										href="/sign-up"
										className={`${linkStyles.container} ${linkStyles.white}`}>
										Cadastrar
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>

				<IoMenuOutline
					className={styles.icon}
					onClick={handleVisibility}
				/>
			</Wrapper>
		</header>
	);
};

export default Header;
