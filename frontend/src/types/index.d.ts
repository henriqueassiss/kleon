type TLink = {
	label: string;
	slug: string;
	icon?: any;
};

type TResponse<T> = {
	success: boolean;
	status: number;
	data: T;
};
