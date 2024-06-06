import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Map } from "@/components";
import "@/asserts/styles/global.less";

import i18n from "./locale";

const App: React.FC<{}> = (props) => {
	return (
		<I18nextProvider i18n={i18n}>
			<BrowserRouter>
				<div>
					<Map />
				</div>
			</BrowserRouter>
		</I18nextProvider>
	);
};

export default App;
