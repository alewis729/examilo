import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import PropTypes from "prop-types";

const PrivateRoute = ({
	auth: { loading, isAuthenticated },
	loadUser,
	component: Component,
	...rest
}) => {
	useEffect(() => {
		loadUser();

		// eslint-disable-next-line
	}, []);

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ loadUser }
)(PrivateRoute);
