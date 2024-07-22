export type InputControlProps = {
	onCommandRun: (
		event: React.KeyboardEvent<HTMLInputElement>,
		command: string
	) => void;
};

export type InputControlRefType = {
	focus: () => void;
	change: (val: string) => void;
};
