import api from '@/lib/axios';
import { AxiosError } from 'axios';

type TPostReq = {
	path: string;
	data: any;
};

export const getReq = (path: string) =>
	api
		.get(path)
		.then((res): TResponse<any> => res.data)
		.catch((err: AxiosError): TResponse<any> => {
			return {
				success: false,
				status: err.response?.status,
				data: null,
			};
		});

export const postReq = ({ path, data }: TPostReq) =>
	api
		.post(path, data)
		.then((res): TResponse<any> => res.data)
		.catch((err: AxiosError): TResponse<any> => {
			return {
				success: false,
				status: err.response?.status,
				data: null,
			};
		});
