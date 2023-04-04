import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import blankLocation from '@public/svgs/BlankUser.svg';
import {
	IoCall,
	IoMail,
	IoMailOutline,
	IoPhonePortraitOutline,
} from 'react-icons/io5';

export type TCardDefault = {
	image: string;
	name: string;
	role: string;
	company: string;
	email: string;
	phoneNumber: string;
};

const CardDefault = ({
	image,
	name,
	role,
	company,
	email,
	phoneNumber,
}: TCardDefault) => {
	const initials = name.split(' ')[0][0] + name.split(' ')[1][0];

	return (
		<Link href={'/'} className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.wrapperHeader}>
					<Image
						priority
						sizes="384"
						alt="Imagem do contato"
						src={image || blankLocation}
					/>

					<span>{initials}</span>
				</div>

				<h3 className={styles.name}>{name}</h3>

				<div className={styles.job}>
					<span>{role} at</span>
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
		</Link>
	);
};

export default CardDefault;
