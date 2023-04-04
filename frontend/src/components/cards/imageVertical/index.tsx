import styles from './styles.module.scss';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export type TImageVerticalCard = {
	to: string;
	title: string;
	image: StaticImageData;
	description: string;
};

const ImageVerticalCard = ({
	to,
	title,
	image,
	description,
}: TImageVerticalCard) => {
	return (
		<Link href={to} className={styles.container}>
			<Image
				fill
				priority
				src={image}
				sizes="384"
				alt="Fundo do tipo de local"
			/>

			<div>
				<h3>{title}</h3>

				<p>{description}</p>
			</div>
		</Link>
	);
};

export default ImageVerticalCard;
