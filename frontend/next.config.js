/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {},
	images: {
		loader: 'default',
		domains: [process.env.NEXT_PUBLIC_API_PUBLIC_URL],
	},
};

module.exports = nextConfig;
