import {
	useSnackbar,
	ProviderContext,
	VariantType,
	SnackbarMessage,
	SnackbarOrigin,
	SnackbarKey
} from "notistack";
import { uuid } from "@/tools/generate";

const useReminder = (key?: SnackbarKey) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const reminder = (
		type: VariantType,
		message: SnackbarMessage = "Failed",
		position: SnackbarOrigin = {
			vertical: "top",
			horizontal: "center"
		},
		autoHideDuration: number = 1500
	) => {
		enqueueSnackbar(message, {
			key: key ?? uuid(),
			variant: type,
			anchorOrigin: position,
			autoHideDuration
		});
	};

	const closeReminder = () => {
		closeSnackbar(key);
	};

	return {
		reminder,
		closeReminder
	};
};

export default useReminder;
