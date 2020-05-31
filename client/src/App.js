import React, { Fragment, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import setAuthToken from "./utilFuncs/setAuthToken";
import "./App.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alerts from "./components/utils/Alerts";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Routes from "./components/routing/Routes";
import RouterListener from "./components/routing/RouterListener";
import Preloader from "./components/utils/Preloader";
import { loadUser } from "./redux/actions/authActions";

const homePage = "/groups";
if (localStorage.token) setAuthToken(localStorage.token);

const App = ({ auth: { loading, isAuthenticated }, loadUser }) => {
	const [access, setAccess] = useState("");
	const [fakeLoading, setFakeLoading] = useState(true);
	const [lastPage, setLastPage] = useState(homePage);

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isAuthenticated) setAccess("private");
		else setAccess("public");
		// eslint-disable-next-line
	}, [isAuthenticated]);

	useEffect(() => {
		if (!loading && access !== "") setFakeLoading(false);
	}, [loading, access]);

	const routerChangeHandler = () => {
		if (localStorage.lastPage) setLastPage(localStorage.lastPage);
		else setLastPage(homePage);
	};

	return (
		<Fragment>
			<Preloader loading={fakeLoading} main={true} bgColor="yellow" />
			<Router>
				<RouterListener handleChange={routerChangeHandler} />
				<div className={`main main--${access}`}>
					<Navigation access={access} />
					<div className="main--content">
						<Alerts />
						<Switch>
							<Route
								exact
								path="/"
								render={() =>
									!isAuthenticated ? (
										<Redirect to="/login" />
									) : (
										<Redirect to={lastPage} />
									)
								}
							/>
							<Route component={Routes} />
						</Switch>
					</div>
					{access === "public" && <Footer />}
				</div>
			</Router>
		</Fragment>
	);
};

App.propTypes = {
	auth: PropTypes.object.isRequired,
	loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ loadUser }
)(App);
