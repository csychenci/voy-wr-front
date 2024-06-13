import { commonCheck } from "@/tools/check";
import { CommonChangeEvent, CommonCommitEvent } from "@/types/event";
import { useState } from "react";

const useCommonIndex = <T>(
	initItem: (item?: Partial<T>) => T,
	checkKeys: (keyof T)[] = []
) => {
	const [dataSource, setDataSource] = useState<T>(initItem());

	const change: CommonChangeEvent<T> = (key, value) => {
		setDataSource((prev) => ({ ...prev, [key]: value }));
	};

	const commit: CommonCommitEvent<T> = (item) => {
		setDataSource((prev) => ({ ...prev, ...item }));
	};

	const init: CommonCommitEvent<T> = (item) => {
		setDataSource(initItem(item));
	};

	const check = () => {
		return commonCheck(dataSource, checkKeys);
	};

	return {
		dataSource,
		setDataSource,
		change,
		commit,
		init,
		check
	};
};

export default useCommonIndex;
