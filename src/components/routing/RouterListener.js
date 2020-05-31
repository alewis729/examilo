import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { history as historyShape } from "react-router-prop-types";
import { animateScroll as scroll } from "react-scroll";

const RouterListener = ({ history, handleChange }) => {
	useEffect(() => {
		handleChange(history.location);
		scroll.scrollToTop({ duration: 350 });
		if (localStorage.token && history.location.pathname !== "/login") {
			localStorage.setItem("lastPage", history.location.pathname);
		} else if (!localStorage.token) localStorage.removeItem("lastPage");
		// eslint-disable-next-line
	}, [history.location.key]);

	return null;
};

RouterListener.propTypes = {
	history: historyShape,
	handleChange: PropTypes.func.isRequired
};

export default withRouter(RouterListener);
