import React from "react";
import style from "./index.module.less";
import { FC } from "react";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

const Layout: FC<{}> = (props) => {
	return (
		<div className={classNames("fleet-common", style["fleet-layout"])}>
			<Outlet />
		</div>
	);
};

export default Layout;
