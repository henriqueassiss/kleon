import styles from './styles.module.scss';
import Wrapper from '@/components/layouts/wrapper';
import Button from '@/components/button';
import { useContext } from 'react';
import { CookiesContext } from '@/contexts/cookies';

const Cookies = () => {
	const { markAsRead } = useContext(CookiesContext);

	return (
		<div className={styles.container}>
			<Wrapper className={styles.wrapper}>
				<h2>Política de Cookies</h2>

				<div>
					<p>
						O website do Kleon utiliza cookies para melhorar a sua
						experiência de navegação. Os cookies são pequenos
						ficheiros de texto que são armazenados no seu
						dispositivo quando visita um website.
					</p>

					<p>
						Utilizamos cookies essenciais que são necessários para
						permitir que o website funcione corretamente e cookies
						de desempenho que nos ajudam a melhorar o desempenho do
						website e a compreender como os visitantes interagem com
						o mesmo. Também utilizamos cookies de funcionalidade que
						nos permitem personalizar a sua experiência de navegação
						e cookies de publicidade que nos ajudam a apresentar
						anúncios relevantes aos seus interesses.
					</p>

					<p>
						Ao continuar a utilizar o nosso website, está a
						concordar com a utilização de cookies. Se desejar
						desativar os cookies, pode fazê-lo nas definições do seu
						navegador. No entanto, por favor note que ao desativar
						os cookies, algumas funcionalidades do website podem
						deixar de funcionar corretamente.
					</p>

					<p>
						Para saber mais sobre como utilizamos os cookies e como
						pode gerir as suas preferências, por favor consulte a
						nossa Política de Privacidade.
					</p>
				</div>

				<Button theme="white" isLoading={false} onClick={markAsRead}>
					Entendi
				</Button>
			</Wrapper>
		</div>
	);
};

export default Cookies;
