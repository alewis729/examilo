import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from "../types";

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT:
			return [action.payload, ...state];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== action.payload);
		case CLEAR_ALERTS:
			return [];
		default:
			return state;
	}
};
