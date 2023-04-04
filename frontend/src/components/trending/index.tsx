import CardDefault, { TCardDefault } from '@/components/cards/default';

import { getReq } from '@/lib/swr';
import useSWR from 'swr';
import styles from './styles.module.scss';
import Image from 'next/image';
import loader from '@public/svgs/LoaderBlue.svg';
import Wrapper from '@/components/layouts/wrapper';
import { useState } from 'react';

const Trending = () => {
	const [offset, setOffset] = useState(0);
	const { data, isLoading } = useSWR<TResponse<TCardDefault[]>>(
		'/contact?offset=' + offset,
		getReq,
	);

	return (
		<section className={styles.container}>
			<Wrapper className={styles.wrapper}>
				<h2>
					Popular
					<br />
					<span className={styles.highlight}>Contacts</span>
				</h2>

				<p className={styles.description}>
					These are the month popular contacts
					<br />
					to help you build your networking.
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

				<div className={styles.pages}>
					<button
						onClick={() => setOffset(0)}
						className={offset === 0 ? styles.active : ''}>
						1
					</button>
					<button
						onClick={() => setOffset(12)}
						className={offset === 12 ? styles.active : ''}>
						2
					</button>
				</div>
			</Wrapper>
		</section>
	);
};
export default Trending;
