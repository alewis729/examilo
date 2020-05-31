import React from "react";
import sprite from "../../media/svg/sprite-v1.svg";
import PropTypes from "prop-types";

const SVG = ({ icon, className }) => {
	return (
		<svg className={className}>
			<use xlinkHref={`${sprite}#icon-${icon}`} />
		</svg>
	);
};

SVG.propTypes = {
	icon: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired
};

export default SVG;
