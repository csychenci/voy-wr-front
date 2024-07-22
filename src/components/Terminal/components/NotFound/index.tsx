import React, { FC } from "react";
import "./index.less";
import { NotFoundProps } from "./type";

const TerminalNotFound: FC<NotFoundProps> = ({ command }) => {
	return (
		<ul className="terminal-notFound">
			<li className="notFound-label">zsh: command not found: </li>
			<li className="notFound-command">{command}</li>
		</ul>
	);
};

export default TerminalNotFound;
