import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		minHeight: "100vh",
		padding: 0,
		margin: 0,
		maxWidth: "none",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	appBar: {
		boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.1)",
		zIndex: theme.zIndex.modal + 1,
	},
	main: {
		flexGrow: 1,
	},
}));
