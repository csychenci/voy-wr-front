export const dateToUtcString = (d: Date | string | number) => {
	const date = new Date(d);
	const YY = date.getUTCFullYear() + "-";
	const MM =
		(date.getUTCMonth() + 1 < 10
			? "0" + (date.getUTCMonth() + 1)
			: date.getUTCMonth() + 1) + "-";
	const DD =
		date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
	const hh =
		(date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours()) +
		":";
	const mm =
		(date.getUTCMinutes() < 10
			? "0" + date.getUTCMinutes()
			: date.getUTCMinutes()) + ":";
	const ss =
		date.getUTCSeconds() < 10
			? "0" + date.getUTCSeconds()
			: date.getUTCSeconds();
	return YY + MM + DD + " " + hh + mm + ss;
};
