import React, { PropsWithChildren } from "react";
import { ButtonProps } from "../Button/interface";

type PopoverPlacementSideType = "top" | "right" | "bottom" | "left";
type PopoverPlacementAlignedType = "start" | "end";

export interface PopoverProps extends PropsWithChildren {
	disabled?: boolean;
	trigger?: "click" | "hover";
	placement?:
		| PopoverPlacementSideType
		| `${PopoverPlacementSideType}-${PopoverPlacementAlignedType}`;
	content?: React.ReactNode;
	buttonProps?: ButtonProps;
	render?: (setIsOpen: (val: boolean) => void) => React.ReactNode;
	open?: boolean;
	onOpenChange?: (val: boolean) => void;
	className?: string;
	overlayClassName?: string;
}
