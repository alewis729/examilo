import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSpring, config } from "react-spring";

const ScrollTo = ({ pos, scrollNow }) => {
	const [current, setCurrent] = useState(0);
	const [, setY] = useSpring(() => ({
		immediate: false,
		y: current,
		onFrame: (props) => window.scroll(0, props.y),
		config: config.slow
	}));

	useEffect(() => {
		const handleScroll = () => setCurrent(window.pageYOffset);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (scrollNow === true && pos !== -1) setY({ y: pos });
		// eslint-disable-next-line
	}, [scrollNow, pos]);

	return null;
};

ScrollTo.propTypes = {
	pos: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
	pos: state.scroll.current,
	scrollNow: state.scroll.now
});

export default connect(
	mapStateToProps,
	{}
)(ScrollTo);
