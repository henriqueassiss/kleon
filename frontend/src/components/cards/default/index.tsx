import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { IoCall, IoMail } from 'react-icons/io5';

export type TCardDefault = {
	id: string;
	fullName: string;
	jobTitle: string;
	company: string;
	email: string;
	phoneNumber: string;
};

const CardDefault = ({
	id,
	fullName,
	jobTitle,
	company,
	email,
	phoneNumber,
}: TCardDefault) => {
	const image = process.env.NEXT_PUBLIC_API_PUBLIC_URL + id;
	const initials = fullName.split(' ')[0][0] + fullName.split(' ')[1][0];

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.wrapperHeader}>
					<Image
						priority
						width={384}
						unoptimized
						src={image}
						height={384}
						loader={() => image}
						alt="Imagem do contato"
					/>

					<span>{initials}</span>
				</div>

				<h3 className={styles.name}>{fullName}</h3>

				<div className={styles.job}>
					<span>{jobTitle} at</span>
					<span>{company}</span>
				</div>

				<div className={styles.info}>
					<IoCall />
					<span>{phoneNumber}</span>
				</div>

				<div className={styles.info}>
					<IoMail />
					<span>{email}</span>
				</div>
			</div>
		</div>
	);
};

export default CardDefault;
