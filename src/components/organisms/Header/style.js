import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	logo: {
		display: "flex",
		flexGrow: 1,
		"& > svg": {
			width: "auto",
			minHeight: 45,
		},
	},
});
