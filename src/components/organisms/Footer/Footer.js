import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Tooltip, Link, IconButton } from "@material-ui/core";
import {
	GitHub as IconGithub,
	LinkedIn as IconLinkedIn,
} from "@material-ui/icons";

import { useStyles } from "./style";

const Footer = ({ copy, links }) => {
	const classes = useStyles();

	// eslint-disable-next-line react/prop-types
	const renderLinkIcon = ({ url, icon }) => (
		<Link href={url} target="_blank" rel="noreferrer">
			<IconButton>{icon}</IconButton>
		</Link>
	);

	return (
		<Grid className={classes.root} container>
			<Typography>{copy}</Typography>
			<div className={classes.icons}>
				{links.map(link => (
					<div key={link.url}>
						{!link.title ? (
							renderLinkIcon(link)
						) : (
							<Tooltip title={link.title} placement="top">
								{renderLinkIcon(link)}
							</Tooltip>
						)}
					</div>
				))}
			</div>
		</Grid>
	);
};

Footer.propTypes = {
	copy: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string,
			icon: PropTypes.element,
		})
	),
};

Footer.defaultProps = {
	copy: "© 2020 Alfred Lewis",
	links: [
		{
			url: "https://github.com/alewis729/examilo",
			title: "Repo",
			icon: <IconGithub />,
		},
		{ url: "https://github.com/alewis729", title: "Dev", icon: <IconGithub /> },
		{ url: "https://www.linkedin.com/in/alewis729/", icon: <IconLinkedIn /> },
	],
};

export default Footer;
