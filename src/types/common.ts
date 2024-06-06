export type CommonPageParamsType = {
	pageNum: number;
	pageSize: number;
	keyword?: string;
};

export type CommonOperatorType = {
	updateTime: number;
	updateUser: number;
	createTime: number;
	createUser: number;
};

export type CommonNumType = number | "";

export type CommonOptionType<K, V> = {
	label: K;
	value: V;
};
