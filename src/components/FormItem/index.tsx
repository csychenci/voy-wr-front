import React from "react";
import classnames from "classnames";
import style from "./index.module.less";

type FleetFormItemProps = {
	className?: string;
	containerClassname?: string;
	value?: string;
	onChange?: (val: string) => void;
	label?: string;
	type?: "column" | "row";
	children?: React.ReactNode;
	needVerity?: boolean;
};

const FleetFormItem: React.FC<FleetFormItemProps> = ({
	className,
	containerClassname,
	needVerity,
	value,
	onChange,
	label,
	children,
	type = "column"
}) => {
	console.log("chien", children);
	return (
		<div
			className={classnames(
				style["fleet-formitem"],
				{
					[style["fleet-formitem__row"]]: type === "row"
				},
				containerClassname
			)}
		>
			<span
				className={classnames("label", {
					disabled: !needVerity
				})}
			>
				{label}
			</span>
			{children}
		</div>
	);
};

export default FleetFormItem;
