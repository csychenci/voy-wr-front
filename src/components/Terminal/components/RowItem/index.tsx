import React, { FC } from "react";
import "./index.less";
import { TerminalRowItemProps } from "./type";

const TerminalRowItem: FC<TerminalRowItemProps> = ({ command }) => {
	return (
		<div className="terminal-rowItem">
			<ul className="rowItem-loginUser">
				<li>azuuuuuu</li>
				<li>@AzuuuuuudeMacBook-Pro</li>
				<li>~</li>
			</ul>
			<div className="rowItem-command">{command}</div>
		</div>
	);
};

export default TerminalRowItem;
