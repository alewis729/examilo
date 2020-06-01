import { createMuiTheme } from "@material-ui/core/styles";
import { rgba } from "@/helpers";

const theme = createMuiTheme({
	palette: {
		type: "light",
		primary: {
			dark: "#3e63aa",
			main: "#0f8fef",
			light: "#0bb2f4",
			contrastText: "#f7f7f7",
		},
		secondary: {
			main: "#222",
			light: "#393939",
			contrastText: "#f7f7f7",
		},
		success: {
			light: "#33e28a",
			main: "#2bba73",
			dark: "#3E9E42",
			contrastText: "#f7f7f7",
		},
		error: {
			light: "#f46969",
			main: "#bc4242",
			dark: "#B53838",
			contrastText: "#f7f7f7",
		},
		common: {
			blue: "#0f8fef",
			purple: "#424c89",
			celeste: "#008fa9",
			yellow: "#d8d441",
			green: "#2bba73",
			red: "#bc4242",
		},
		text: {
			hint: "#0f8fef",
		},
		background: {
			paper: "#fff",
			default: "#ecf6fe",
			dark: "#eef3f4",
			light: "#fdfdfd",
		},
	},
	helpers: {
		boxShadowLight: `0 2px 2px 0px ${rgba("#202020", 0.14)}`,
		boxShadow: `0 3px 5px 2px ${rgba("#202020", 0.1)}`,
		transitionQuick: "all 0.25s ease-out",
		transitionNormal: "all 0.45s ease-out",
	},
	typography: {
		fontFamily: "Nunito Sans",
		fontFamilyDisplay: "Nunito",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightSemibold: 600,
		fontWeightBold: 700,
	},
});

export default theme;
