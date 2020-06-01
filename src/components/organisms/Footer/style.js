import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
	root: {
		flexDirection: "column-reverse",
		alignItems: "center",
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
	},
	icons: {
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up("sm")]: {
			marginBottom: theme.spacing(0),
		},
		display: "flex",
		"& a": {
			marginLeft: theme.spacing(1),
			paddingTop: theme.spacing(1),
		},
	},
}));
