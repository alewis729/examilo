import React from "react";
import PropTypes from "prop-types";
import { Container, Toolbar, AppBar, Box } from "@material-ui/core";

import { useStyles } from "./style";

const Default = ({ header, children }) => {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<div>
				<Toolbar />
				<AppBar className={classes.appBar} position="fixed" color="inherit">
					<Container maxWidth="xl">{header}</Container>
				</AppBar>
			</div>
			<Container className={classes.main} component="main" maxWidth="xl">
				<Box p={6}>{children}</Box>
			</Container>
		</Container>
	);
};

Default.propTypes = {
	header: PropTypes.node.isRequired,
	children: PropTypes.any,
};

export default Default;
