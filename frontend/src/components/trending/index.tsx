import CardDefault, { TCardDefault } from '@/components/cards/default';

import { getReq } from '@/lib/swr';
import useSWR from 'swr';
import styles from './styles.module.scss';
import Image from 'next/image';
import loader from '@public/svgs/LoaderBlue.svg';
import Wrapper from '@/components/layouts/wrapper';

const Trending = () => {
	const { data, isLoading } = useSWR<TResponse<TCardDefault[]>>(
		'/contact?offset=12',
		getReq,
	);

	return (
		<section className={styles.container}>
			<Wrapper className={styles.wrapper}>
				<h2>
					Contatos
					<br />
					<span className={styles.highlight}>Populares</span>
				</h2>

				<p className={styles.description}>
					Estes são os contatos populares do
					<br />
					mês para criar o seu networking.
				</p>

				<div className={styles.cards}>
					{!isLoading && data.data ? (
						data.data.map((card, i) => (
							<CardDefault key={i} {...card} />
						))
					) : (
						<Image
							src={loader}
							alt="Carregando..."
							className={styles.loading}
						/>
					)}
				</div>
			</Wrapper>
		</section>
	);
};
export default Trending;
