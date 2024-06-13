import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Button, Map, Tooltip } from "@/components";

import i18n from "./locale";

const App: React.FC<{}> = (props) => {
	return (
		<I18nextProvider i18n={i18n}>
			<BrowserRouter>
				{/* <Map /> */}
				<Tooltip
					trigger="click"
					children={<Button size="small">click</Button>}
					title="11111"
				/>
			</BrowserRouter>
		</I18nextProvider>
	);
};

export default App;
