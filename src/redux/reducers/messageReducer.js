import { SET_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from "../types";

const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return [action.payload, ...state];
		case CLEAR_MESSAGE:
			return state.filter((msg) => msg !== action.payload);
		case CLEAR_ALL_MESSAGES:
			return [];
		default:
			return state;
	}
};
