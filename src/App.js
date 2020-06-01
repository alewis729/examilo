import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

import Routes from "@/routes";
import { main as theme } from "@/components/themes";

const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<ModalProvider rootComponent={TransitionGroup}>
					<CssBaseline />
					<Route component={Routes} />
				</ModalProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
