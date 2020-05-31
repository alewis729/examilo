import React, { useState } from "react";
import { connect } from "react-redux";
import { removeAlert, clearAlerts } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";
import RouterListener from "../routing/RouterListener";
import SVG from "./SVG";
import { useTransition, animated as a } from "react-spring";

const Alerts = ({ alerts, removeAlert, clearAlerts }) => {
	const [refMap] = useState(() => new WeakMap());
	const transitions = useTransition(alerts, (item) => item.id, {
		from: { opacity: 0, height: 0, marginTop: "1.5rem" },
		enter: (item) => async (next) =>
			await next({
				opacity: 1,
				height: refMap.get(item).offsetHeight
			}),
		leave: (item) => async (next) => {
			await next({ opacity: 0 });
			await next({ height: 0, marginTop: "0" });
		},
		onRest: (item) => {
			setTimeout(() => {
				remove(item);
			}, item.timeout * 1000);
		}
	});

	const routerChangeHandler = (location) => clearAlerts();
	const remove = (item) => {
		if (alerts.includes(item)) removeAlert(item.id);
	};

	return (
		<div className="alerts">
			<RouterListener handleChange={routerChangeHandler} />
			{transitions.map(({ item, props }) => (
				<a.div
					key={item.id}
					style={props}
					className={`alerts__item alerts__item--${item.type}`}
				>
					<div
						className="alerts__item--content"
						ref={(ref) => ref && refMap.set(item, ref)}
					>
						<p className="alerts__item--txt">{item.msg}</p>
						<button
							className="alerts__item__btn"
							onClick={(e) => {
								e.stopPropagation();
								remove(item);
							}}
						>
							<SVG icon="x" className="alerts__item__btn--icon" />
						</button>
					</div>
				</a.div>
			))}
		</div>
	);
};

Alerts.propTypes = {
	alerts: PropTypes.array.isRequired,
	removeAlert: PropTypes.func.isRequired,
	clearAlerts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alerts
});

export default connect(
	mapStateToProps,
	{ removeAlert, clearAlerts }
)(Alerts);
