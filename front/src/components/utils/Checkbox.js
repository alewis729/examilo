import React from "react";
import PropTypes from "prop-types";
import SVG from "./SVG";

const Checkbox = ({ state = 0, className }) => {
	const icons = ["chb-empty", "chb-minus", "chb-ticked"];

	return <SVG icon={icons[state]} className={className} />;
};

Checkbox.propTypes = {
	state: PropTypes.number.isRequired,
	className: PropTypes.string.isRequired
};

export default Checkbox;
