import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./index.less";
import { InputControlProps, InputControlRefType } from "./type";

const TerminalInputControl = forwardRef<InputControlRefType, InputControlProps>(
	({ onCommandRun }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);

		useImperativeHandle(ref, () => {
			return {
				focus: () => {
					inputRef?.current?.focus();
				},
				change: (val: string) => {
					inputRef.current.value = val;
				}
			};
		});

		return (
			<div className="terminal-inputControl">
				<ul className="inputControl-loginUser">
					<li>azuuuuuu</li>
					<li>@AzuuuuuudeMacBook-Pro</li>
					<li>~</li>
				</ul>
				<div className="inputControl">
					<input
						type="text"
						autoComplete="off"
						autoFocus={true}
						ref={inputRef}
						onKeyUp={(event) => {
							onCommandRun?.(event, inputRef.current.value);
						}}
					/>
				</div>
			</div>
		);
	}
);

export default TerminalInputControl;
