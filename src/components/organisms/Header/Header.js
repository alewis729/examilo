import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Box, IconButton } from "@material-ui/core";
import { MenuOpenRounded as IconMenu } from "@material-ui/icons";

import { useStyles } from "./style";
import { IconLogo } from "@/icons";

const Header = ({ actions, onMenuClick }) => {
	const classes = useStyles();

	return (
		<Toolbar disableGutters className={classes.root} id="remove">
			<Box mr={2}>
				<IconButton onClick={onMenuClick} color="secondary">
					<IconMenu />
				</IconButton>
			</Box>
			<div className={classes.logo}>
				<IconLogo />
			</div>
			{actions && (
				<Box display="flex" alignItems="center">
					{actions}
				</Box>
			)}
		</Toolbar>
	);
};

Header.propTypes = {
	actions: PropTypes.any,
	onMenuClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
	actions: null,
	onMenuClick: () => {},
};

export default Header;
