import React, { FC, MouseEventHandler, useRef, useState } from "react";
import "./index.less";
import {
	TerminalHeader,
	TerminalInputControl,
	TerminalNotFound,
	TerminalRowItem
} from "./components";
import { InputControlRefType } from "./components/InputControl/type";
import { generateRandomString } from "./tools";

const Terminal: FC<{}> = (props) => {
	const [cuurentCount, setCurrentCount] = useState(0);
	const commandHistory = useRef<string[]>([]);
	const inputControlRef = useRef<InputControlRefType>();
	const terminalRef = useRef<HTMLDivElement>(null);
	const [content, setContent] = useState<JSX.Element[]>([]);

	const handleTerminalClick: MouseEventHandler<HTMLDivElement> = (event) => {
		const selectedText = window.getSelection()?.toString();
		if (!selectedText) {
			inputControlRef?.current?.focus();
		} else {
			event?.stopPropagation();
		}
	};

	const handleCommandRun = (
		event: React.KeyboardEvent<HTMLInputElement>,
		command: string
	) => {
		switch (true) {
			case event?.key === "ArrowUp":
				const upIndex = Math.max(cuurentCount - 1, 0);
				setCurrentCount(upIndex);
				inputControlRef?.current?.change(commandHistory?.current?.[upIndex]);
				break;
			case event?.key === "ArrowDown":
				debugger;
				const downIndex = Math.min(
					cuurentCount + 1,
					commandHistory?.current?.length - 1
				);
				inputControlRef?.current?.change(
					commandHistory?.current?.[downIndex] ?? ""
				);
				setCurrentCount(downIndex);
				break;
			case event?.key === "Enter":
				if (command?.trim() === "clear") {
					setContent([]);
					inputControlRef?.current?.change("");
					return;
				}
				commandHistory.current = [...commandHistory.current, command?.trim()];
				setCurrentCount((prev) => prev + 1);
				const newContent = [...content];
				newContent?.push(
					<TerminalRowItem key={generateRandomString()} command={command} />
				);
				if (command !== "") {
					newContent?.push(
						<TerminalNotFound key={generateRandomString()} command={command} />
					);
				}
				setContent([...newContent]);
				inputControlRef?.current?.change("");
			default:
				break;
		}
	};

	return (
		<div className="voy-terminal">
			<TerminalHeader />
			<div
				className="terminal-container"
				ref={terminalRef}
				onClick={handleTerminalClick}
			>
				{content?.map((item, index) => {
					return item;
				})}
				<TerminalInputControl
					ref={inputControlRef}
					onCommandRun={handleCommandRun}
				/>
			</div>
		</div>
	);
};

export default Terminal;
