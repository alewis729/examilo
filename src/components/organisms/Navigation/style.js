import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
	list: {
		paddingTop: theme.spacing(2),
	},
	item: {
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(8),
	},
}));
