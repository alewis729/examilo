import React from "react";
import { useSpring, animated } from "react-spring";

const Footer = () => {
	const footer = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: { opacity: 0, transform: "translateY(100%)" }
	});

	return (
		<animated.div style={footer} className="footp">
			<div className="footp--content">
				<p className="footp--copy">
					&copy; 2019 Examilo. Todos los derechos reservados.
				</p>
			</div>
		</animated.div>
	);
};

export default Footer;
