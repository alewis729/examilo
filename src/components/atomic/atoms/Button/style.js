import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { rgba } from "@/helpers";

export const RoundedButton = withStyles(theme => ({
	root: {
		backgroundImage: ({ displaycolor: color }) => `linear-gradient(
			75deg,
			${theme.palette[color].light},
			${theme.palette[color].main}
		)`,
		color: ({ displaycolor: color }) => theme.palette[color].contrastText,
		textTransform: "capitalize",
		borderRadius: ({ fullWidth }) => (fullWidth ? 0 : 100),
		position: "relative",
		overflow: "hidden",
		padding: theme.spacing(1, 3.5),
		transition: theme.helpers.transitionQuick,
		"&:hover": {
			boxShadow: ({ displaycolor: color }) =>
				`0 3px 5px 2px ${rgba(theme.palette[color].light, 0.2)}`,
		},
		"&:hover::before": {
			opacity: "1",
		},
		"&:before": {
			opacity: "0",
			content: "''",
			width: "110%",
			height: "110%",
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			transition: "inherit",
			backgroundImage: ({ displaycolor: color }) => `linear-gradient(
				75deg,
				${theme.palette[color].main},
				${theme.palette[color].light}
			)`,
		},
		"& > .MuiButton-label": {
			display: "flex",
			position: "relative",
			zIndex: "inherit",
		},
	},
}))(Button);
