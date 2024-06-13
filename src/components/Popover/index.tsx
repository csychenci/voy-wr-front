import React, { FC, Fragment, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import {
	useInteractions,
	useFloating,
	useClick,
	useDismiss,
	offset,
	arrow,
	FloatingArrow,
	flip,
	shift,
	useHover,
	autoUpdate,
	useTransitionStyles
} from "@floating-ui/react";
import { PopoverProps } from "./interface";
import "./index.less";
import { createPortal } from "react-dom";
import Button from "../Button";

const Popover: FC<PopoverProps> = ({
	children,
	content,
	className,
	overlayClassName,
	open,
	placement = "bottom-start",
	disabled,
	trigger = "click",
	buttonProps,
	render,
	onOpenChange
}) => {
	const [isOpen, setIsOpen] = useState(open || false);

	const openValue = useMemo(() => {
		return open ?? isOpen;
	}, [open, isOpen]);

	const arrowRef = useRef(null);

	const { refs, floatingStyles, context } = useFloating({
		open: openValue,
		onOpenChange: (open) => {
			setIsOpen(open);
			onOpenChange?.(open);
		},
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(10),
			arrow({
				element: arrowRef
			}),
			flip(),
			shift()
		]
	});

	const clickInteraction = useClick(context, {
		enabled: trigger === "click" && !disabled
	});

	const hoverInteraction = useHover(context, {
		enabled: trigger === "hover" && !disabled
	});
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		clickInteraction,
		hoverInteraction,
		dismiss
	]);

	const { isMounted, styles } = useTransitionStyles(context);

	const el = useMemo(() => {
		const el = document?.createElement("div");
		el.className = "fleet-popover--overlay";
		el.style.cssText = "z-index: 9999;";
		console.log("document", document?.body);
		document?.body?.appendChild(el);
		return el;
	}, []);

	const floating = openValue && (
		<div
			className={classnames("fleet-popover", overlayClassName, {
				open: openValue
			})}
			ref={refs.setFloating}
			style={{ ...floatingStyles, ...styles }}
			{...getFloatingProps()}
		>
			{render ? (
				render(setIsOpen)
			) : (
				<div className="fleet-popover-content">{content}</div>
			)}
			<FloatingArrow
				ref={arrowRef}
				context={context}
				fill="#fff"
				// strokeWidth={1}
			/>
		</div>
	);

	return (
		<Fragment>
			<div
				ref={refs?.setReference}
				{...getReferenceProps()}
				className={classnames("fleet-popover-trigger", className)}
			>
				{buttonProps ? <Button {...buttonProps}></Button> : children}
			</div>
			{createPortal(floating, el)}
		</Fragment>
	);
};

export default Popover;
