import React from "react";
import classnames from "classnames";
import style from "./index.module.less";
import Loading from "../Loading";

export type DialogChildrenProps = {
	hide: boolean;
	onClose: () => void;
	mode?: "fixed" | "absolute";
};

const Dialog: React.FC<{
	children?: React.ReactNode;
	mode?: "fixed" | "absolute";
	hide?: boolean;
	onClose?: (e?: any) => void;
	drawer?: boolean;
	closeable?: boolean;
	loading?: boolean;
}> = ({
	hide,
	drawer,
	mode = "absolute",
	children,
	onClose,
	closeable,
	loading
}) => {
	// console.log('hide',hide)
	return (
		<div
			className={classnames(style["fleet-prompt"], {
				[style["fleet-prompt--drawer"]]: drawer
			})}
			style={{ visibility: hide ? "hidden" : "unset", position: mode }}
		>
			<div
				onClick={() => {
					if (drawer && closeable) {
						onClose?.();
						return;
					}
				}}
				className="prompt-mask"
				style={{ opacity: hide ? 0 : 1 }}
			></div>
			<div
				className="prompt-container"
				style={{
					transform: hide
						? drawer
							? "translateX(100%)"
							: "scale(0)"
						: drawer
							? "translateX(0px)"
							: "scale(1)"
				}}
			>
				<Loading loading={loading} />
				{children}
			</div>
		</div>
	);
};

export default Dialog;
