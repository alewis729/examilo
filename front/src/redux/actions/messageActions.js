import { SET_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from "../types";

// set message
export const setMsg = (msg) => (dispatch) => {
	dispatch({ type: SET_MESSAGE, payload: msg });
};

// clear message
export const clearMsg = (msg) => (dispatch) => {
	dispatch({ type: CLEAR_MESSAGE, payload: msg });
};

// clear all messages
export const clearAllMsgs = () => (dispatch) => {
	dispatch({ type: CLEAR_ALL_MESSAGES });
};
