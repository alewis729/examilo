import React from "react";
import PropTypes from "prop-types";

import { RoundedButton } from "./style";

const Button = ({ color, children, ...props }) => (
	<RoundedButton displaycolor={color} {...props}>
		{children}
	</RoundedButton>
);

Button.propTypes = {
	color: PropTypes.oneOf(["primary", "secondary", "success", "error"]),
	children: PropTypes.node.isRequired,
};

Button.defaultProps = {
	color: "primary",
};

export default Button;
