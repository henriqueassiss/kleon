import Wrapper from '@/components/layouts/wrapper';
import styles from './styles.module.scss';
import { data } from '@/components/layouts/footer/mock';

const Footer = () => {
	return (
		<footer className={styles.container}>
			<Wrapper>
				<p className={styles.copy}>{data.copy}</p>
			</Wrapper>
		</footer>
	);
};

export default Footer;
