import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

const Preloader = ({ loading, main, bgColor = "white-1", color = "black" }) => {
	const fade = useSpring({ opacity: loading ? 1 : 0 });

	return (
		<animated.div
			style={fade}
			className={`preloader preloader--${
				main ? "main" : "sub"
			} preloader--${bgColor}`}
		>
			<div
				className={`preloader__content  ${
					main ? "" : "preloader__content--small"
				} preloader__content--${color}`}
			/>
		</animated.div>
	);
};

Preloader.propTypes = {
	loading: PropTypes.bool.isRequired,
	main: PropTypes.bool,
	bgColor: PropTypes.string,
	color: PropTypes.string
};

export default Preloader;
