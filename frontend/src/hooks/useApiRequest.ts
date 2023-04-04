import { postReq } from '@/lib/swr';
import { useState } from 'react';

export const useDefaultApiRequest = (path: string, bodyData: any = null) => {
	const [isLoading, setIsLoading] = useState(false);

	const makeRequest = async (): Promise<TResponse<any>> => {
		setIsLoading(true);

		return await postReq({ path, data: bodyData }).finally(() =>
			setIsLoading(false),
		);
	};

	return {
		isLoading,
		makeRequest,
	};
};
