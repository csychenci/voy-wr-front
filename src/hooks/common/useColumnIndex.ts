import { commonCheck, commonItemsCheck } from "@/tools/check";
import {
	CommonChangeEvent,
	CommonColumnChangeEvent,
	CommonColumnCommitEvent,
	CommonCommitEvent
} from "@/types/event";
import { useState } from "react";

const useColumnIndex = <T>(
	initItem: (item?: Partial<T>) => T,
	checkKeys: (keyof T)[] = []
) => {
	const [dataSource, setDataSource] = useState<T[]>([]);

	const change: CommonColumnChangeEvent<T> = (currentIndex, key, value) => {
		setDataSource((prev) => {
			const currentItem = prev?.[currentIndex];
			prev?.splice(currentIndex, 1, {
				...currentItem,
				[key]: value
			});
			return [...prev];
		});
	};

	const commit: CommonColumnCommitEvent<T> = (currentIndex, item) => {
		setDataSource((prev) => {
			const currentItem = prev?.[currentIndex];
			prev?.splice(currentIndex, 1, {
				...currentItem,
				...item
			});
			return [...prev];
		});
	};

	const init = (items: T[] = []) => {
		setDataSource(items);
	};

	const check = () => {
		return commonItemsCheck(dataSource, checkKeys);
	};

	const add = () => {
		setDataSource((prev) => [...prev, initItem()]);
	};

	const remove = (currentIndex: number) => {
		setDataSource((prev) => {
			const currentItem = prev?.[currentIndex];
			prev?.splice(currentIndex, 1);
			return [...prev];
		});
	};

	return {
		dataSource,
		setDataSource,
		change,
		commit,
		init,
		check,
		add,
		remove
	};
};

export default useColumnIndex;
