import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from "../types";
import uuid from "uuid";

// set alert
export const setAlert = (msg, type = "danger", timeout = 8) => (dispatch) => {
	if (typeof type !== "string") {
		console.error(
			"Alert type provided is not of type string. (Alert actions)"
		);
	}
	dispatch({
		type: SET_ALERT,
		payload: {
			id: uuid.v4(),
			msg,
			type,
			timeout
		}
	});
};

// remove single alert
export const removeAlert = (id) => (dispatch) => {
	dispatch({ type: REMOVE_ALERT, payload: id });
};

// clear alerts
export const clearAlerts = () => (dispatch) => {
	dispatch({ type: CLEAR_ALERTS });
};
