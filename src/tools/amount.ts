/**
 *
 * @param input number
 * @returns string
 * @author azuuuuuuuu
 * @description transfer number to thousandth string
 */
export const formatThousandthNumber = (
	input: number = 0,
	minimumFractionDigits: number = 2,
	maximumFractionDigits: number = 2
): string => {
	return input?.toLocaleString("en-US", {
		minimumFractionDigits: minimumFractionDigits,
		maximumFractionDigits: maximumFractionDigits
	});
};
