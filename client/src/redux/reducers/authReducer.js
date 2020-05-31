import {
	SET_AUTH_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	user: null,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
