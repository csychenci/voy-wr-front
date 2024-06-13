import React, { FC } from "react";
import classnames from "classnames";
import "./index.less";
import { TooltipProps } from "./interface";
import Popover from "../Popover";

const Tooltip: FC<TooltipProps> = ({
	title,
	trigger = "hover",
	placement = "bottom",
	overlayClassName,
	...restProps
}) => {
	return (
		<Popover
			{...restProps}
			trigger={trigger}
			placement={placement}
			overlayClassName={classnames(overlayClassName, "fleet-tooltip")}
			content={title}
		/>
	);
};

export default Tooltip;
