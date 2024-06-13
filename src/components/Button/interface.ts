import React from "react";

export interface ButtonProps {
	className?: string;
	type?: "default" | "primary" | "secondary" | "text" | "icon";
	children: string | React.ReactNode;
	size?: "minuscule" | "small" | "normal" | "large";
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	disabled?: boolean;
	loading?: boolean;
	prefixIcon?: React.ReactNode | string;
	suffixIcon?: React.ReactNode | string;
	tabIndex?: number;
}
