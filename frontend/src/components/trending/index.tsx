import CardDefault, { TCardDefault } from '@/components/cards/default';

import { getReq } from '@/lib/swr';
// import useSWR from 'swr';
import styles from './styles.module.scss';
import Image from 'next/image';
import loader from '@public/svgs/Loaderblue.svg';
import Wrapper from '@/components/layouts/wrapper';

const Trending = () => {
	// const { data, isLoading } = useSWR<TResponse<TCardDefault[]>>(
	// 	'/location/trending',
	// 	getReq,
	// );

	const data = [
		{
			name: 'John Smith',
			role: 'Sales Manager',
			company: 'ABC Corp',
			email: 'john.smith@abccorp.com',
			phoneNumber: '+1-555-555-5551',
		},
		{
			name: 'Jane Doe',
			role: 'Marketing Director',
			company: 'XYZ Corp',
			email: 'jane.doe@xyzcorp.com',
			phoneNumber: '+1-555-555-5552',
		},
		{
			name: 'Bob Johnson',
			role: 'Software Engineer',
			company: 'Acme Inc',
			email: 'bob.johnson@acmeinc.com',
			phoneNumber: '+1-555-555-5553',
		},
		{
			name: 'Alice Lee',
			role: 'HR Manager',
			company: 'Smith Co',
			email: 'alice.lee@smithco.com',
			phoneNumber: '+1-555-555-5554',
		},
		{
			name: 'Michael Chen',
			role: 'Product Manager',
			company: 'Globe Corp',
			email: 'michael.chen@globecorp.com',
			phoneNumber: '+1-555-555-5555',
		},
		{
			name: 'Karen Davis',
			role: 'Customer Service Rep',
			company: 'West Corp',
			email: 'karen.davis@westcorp.com',
			phoneNumber: '+1-555-555-5556',
		},
		{
			name: 'Tom Wilson',
			role: 'Operations Manager',
			company: 'East Corp',
			email: 'tom.wilson@eastcorp.com',
			phoneNumber: '+1-555-555-5557',
		},
		{
			name: 'Jessica Kim',
			role: 'Finance Analyst',
			company: 'North Co',
			email: 'jessica.kim@northco.com',
			phoneNumber: '+1-555-555-5558',
		},
		{
			name: 'David Brown',
			role: 'IT Manager',
			company: 'South Corp',
			email: 'david.brown@southcorp.com',
			phoneNumber: '+1-555-555-5559',
		},
		{
			name: 'Samantha Jones',
			role: 'Marketing Manager',
			company: 'ABC Corp',
			email: 'samantha.jones@abccorp.com',
			phoneNumber: '+1-555-555-5560',
		},
		{
			name: 'Kevin Nguyen',
			role: 'Software Developer',
			company: 'Acme Inc',
			email: 'kevin.nguyen@acmeinc.com',
			phoneNumber: '+1-555-555-5561',
		},
		{
			name: 'Emily Wu',
			role: 'HR Coordinator',
			company: 'Smith Co',
			email: 'emily.wu@smithco.com',
			phoneNumber: '+1-555-555-5562',
		},
		{
			name: 'William Kim',
			role: 'Product Designer',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5563',
		},
		{
			name: 'Arthur Bloom',
			role: 'Software Developer',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5564',
		},
		{
			name: 'Fernanda Pacheco',
			role: 'Product Designer',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5565',
		},
		{
			name: 'Bob Guira',
			role: 'HR Analyst',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5566',
		},
		{
			name: 'Henrique Assis',
			role: 'Software Developer',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5567',
		},
		{
			name: 'Jessica Neres',
			role: 'Finance Analyst',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5568',
		},
		{
			name: 'Peter Moore',
			role: 'CEO',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5569',
		},
		{
			name: 'Justin Smith',
			role: 'Product Owner',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5570',
		},
		{
			name: 'William Jones',
			role: 'Product Designer',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5571',
		},
		{
			name: 'Bob Jackson',
			role: 'Tech Lead',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5572',
		},
		{
			name: 'Thomas Brown',
			role: 'CMO',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5573',
		},
		{
			name: 'John Miller',
			role: 'Product Manager',
			company: 'Globe Corp',
			email: 'william.kim@globecorp.com',
			phoneNumber: '+1-555-555-5574',
		},
	];

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
					{/* {!isLoading && data.data ? (
						{data.map((card, i) => (
						<CardDefault key={i} image="" {...card} />
					))}
					) : (
						<Image
							src={loader}
							alt="Carregando..."
							className={styles.loading}
						/>
					)} */}
				</div>
			</Wrapper>
		</section>
	);
};
export default Trending;
