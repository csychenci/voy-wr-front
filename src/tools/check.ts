export const commonItemsCheck = <T>(items: T[], checkKeys: (keyof T)[]) => {
	let checkKey: keyof any = "",
		checked = true;
	for (let portItem of items) {
		for (let item of checkKeys) {
			if (portItem[item] !== 0 && !portItem[item]) {
				checkKey = item;
				checked = false;
				break;
			}
		}

		if (!checked) {
			break;
		}
	}

	return {
		checked,
		checkKey: checkKey as keyof T
	};
};

export const commonCheck = <T>(items: T, checkKeys: (keyof T)[]) => {
	let checkKey: keyof any = "",
		checked = true;
	for (let key of checkKeys) {
		if (items[key] !== 0 && !items[key]) {
			checkKey = key;
			checked = false;
			break;
		}
	}

	return {
		checkKey: checkKey as keyof T,
		checked
	};
};
