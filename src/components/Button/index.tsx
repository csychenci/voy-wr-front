import React, { FC } from "react";
import classnames from "classnames";
import { ButtonProps } from "./interface";
import "./index.less";

const Button: FC<ButtonProps> = ({
	className,
	size = "small",
	type = "default",
	children,
	disabled = false,
	loading = false,
	tabIndex,
	suffixIcon,
	prefixIcon,
	onClick
}) => {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		if (disabled || loading) return;
		onClick?.(event);
	};
	return (
		<button
			onClick={handleClick}
			tabIndex={tabIndex}
			disabled={disabled || loading}
			className={classnames("fleet-button", type, size, className)}
		>
			{prefixIcon ? (
				typeof prefixIcon === "object" ? (
					prefixIcon
				) : (
					<span
						className={classnames("font_family fleet-button--icon", prefixIcon)}
					></span>
				)
			) : null}
			{children}
			{suffixIcon ? (
				typeof suffixIcon === "object" ? (
					suffixIcon
				) : (
					<span
						className={classnames("font_family fleet-button--icon", suffixIcon)}
					></span>
				)
			) : null}
		</button>
	);
};

export default Button;
