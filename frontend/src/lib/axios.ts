import axios, { Method } from 'axios';
import { parseCookies } from 'nookies';

const { 'kleon.authToken': authToken } = parseCookies();

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

if (authToken) {
	api.defaults.headers['Authorization'] = `Bearer ${authToken}`;
}

export default api;
