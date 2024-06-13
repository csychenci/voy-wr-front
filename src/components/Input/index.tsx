import React, { useRef } from "react";
import classnames from "classnames";
import style from "./index.module.less";

type FleetInputProps = {
	className?: string;
	placeholder?: string;
	prefix?: string;
	suffix?: string;
	value: string | number;
	onChange?: (val: string | number) => void;
	needVerity?: boolean;
	type?: "text" | "number" | "password";
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	onInput?: React.FormEventHandler<HTMLInputElement>;
	disabled?: boolean;
	inputRef?: React.LegacyRef<HTMLInputElement>;
	inputStyle?: React.CSSProperties;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
	max?: number;
	min?: number;
	maxLength?: number;
	minLength?: number;
	renderSuffix?: () => React.ReactNode;
};

export const FleetVerifyInput: React.FC<
	FleetInputProps & {
		label?: string;
		containerClassname?: string;
		dimension?: React.ReactNode;
	}
> = ({
	className,
	containerClassname,
	label,
	placeholder,
	max,
	min,
	prefix,
	needVerity,
	value,
	inputStyle,
	onKeyDown,
	onChange,
	type = "text",
	disabled,
	dimension,
	inputRef,
	suffix,
	...restProps
}) => {
	return (
		<div className={classnames(style["fleet-verity"], containerClassname)}>
			<div className="verity-header">
				<span
					className={classnames("verity-text", {
						disabled: !needVerity
					})}
				>
					{label}
				</span>
			</div>
			<FleetInput
				{...restProps}
				inputRef={inputRef}
				suffix={suffix}
				onKeyDown={onKeyDown}
				max={max}
				min={min}
				inputStyle={inputStyle}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				prefix={prefix}
				className={className}
				type={type}
				disabled={disabled}
			/>
		</div>
	);
};

const FleetInput: React.FC<FleetInputProps> = ({
	className,
	placeholder = "",
	prefix,
	suffix,
	value,
	onKeyDown,
	onChange,
	type = "text",
	onBlur,
	onFocus,
	onInput,
	disabled,
	inputStyle,
	max,
	min,
	inputRef,
	maxLength,
	minLength,
	renderSuffix
}) => {
	const containerRef = useRef<HTMLInputElement>(null);
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log("handleChange", event);
		if (disabled) return;
		let val = event.target.value;
		onChange?.(type === "number" ? (!val ? val : `${+val}`) : val);
	};

	const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
		onBlur?.(e);
		if (type === "number" && (`${value}`?.length === 0 || !value)) {
			return;
		}

		if (type === "number") {
			e.preventDefault();
			onChange?.(value ? parseFloat(`${value}`) : value);
			return;
		}
	};
	const handkeKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
		event
	) => {
		console.log("handkeKeyDown", event, event.key === "E");
		switch (true) {
			case type === "number" && (event.key === "e" || event.key === "E"):
				event?.preventDefault();
				return false;
			case type === "number" &&
				(event.key === "ArrowUp" || event.key === "ArrowDown"):
				event?.preventDefault();
				return false;
			default:
				break;
		}
		onKeyDown?.(event);
	};

	const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const nativeEvent = event?.nativeEvent as InputEvent;
		if (type === "number") {
			event?.preventDefault();
		}
		if (disabled) return;
		let val = event.target.value;
		if ((type === "number" && +val < min) || +val > max) return;
		onChange?.(type === "number" ? (!val ? val : parseFloat(val)) : val);
	};

	const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (
		event
	) => {
		console.log("handlePaste", event, event.clipboardData.getData("Text"));
		const data = event.clipboardData.getData("Text");
		if (type === "number" && (data.includes("e") || data.includes("E"))) {
			event?.preventDefault();
		}
	};

	const handleFocues: React.FocusEventHandler<HTMLInputElement> = (event) => {
		onFocus?.(event);
		console.log("inputRef", inputRef);
		if (type === "number") {
			containerRef?.current?.select();
		}
	};

	return (
		<div
			style={inputStyle}
			className={classnames(style["fleet-input"], className, {
				[style["disabled"]]: disabled
			})}
		>
			{prefix && (
				<span
					className={`fleet-input--prefixIcon font_family ${prefix}`}
				></span>
			)}
			<input
				ref={inputRef || containerRef}
				placeholder={placeholder}
				onBlur={handleBlur}
				// pattern="^-?[0-9]\d*\.?\d*$"
				onPaste={handlePaste}
				onFocus={handleFocues}
				max={max}
				min={min}
				maxLength={maxLength}
				minLength={minLength}
				onKeyDown={handkeKeyDown}
				onInput={handleInput}
				type={type}
				disabled={disabled}
				value={value}
				// onChange={handleChange}
				className={classnames({
					prefix: prefix,
					suffix: suffix || renderSuffix
				})}
			/>
			{renderSuffix ? (
				renderSuffix?.()
			) : suffix ? (
				<span
					className={classnames("fleet-input--suffixIcon font_family", suffix)}
				></span>
			) : null}
		</div>
	);
};

export default FleetInput;
