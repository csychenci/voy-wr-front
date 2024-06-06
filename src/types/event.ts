export type CommonChangeEvent<Form> = <K extends keyof Form>(
	key: K,
	value: Form[K]
) => void;

export type CommonCommitEvent<Form> = (item: Partial<Form>) => void;

export type CommonColumnChangeEvent<Form> = <K extends keyof Form>(
	currentIndex: number,
	key: K,
	value: Form[K]
) => void;

export type CommonColumnCommitEvent<Form> = (
	currentIndex: number,
	item: Partial<Form>
) => void;

export type CommonInitItemEvent<T> = (item?: Partial<T>) => T;
