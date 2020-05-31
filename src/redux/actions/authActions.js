import {
	SET_AUTH_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	USER_LOADED,
	AUTH_ERROR
} from "../types";
import axios from "axios";
import { setMsg } from "./messageActions";
import setAuthToken from "../../utilFuncs/setAuthToken";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_AUTH_LOADING });
};

// load user
export const loadUser = () => async (dispatch) => {
	dispatch(setLoading());

	if (!localStorage.token) {
		dispatch({ type: AUTH_ERROR });
		return;
	}

	setAuthToken(localStorage.token);

	try {
		const res = await axios.get("/api/auth");
		dispatch({ type: USER_LOADED, payload: res.data });
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
		dispatch(setMsg("AUTH_LOADUSER_ERROR"));
	}
};

// register user
export const registerUser = (formData) => async (dispatch) => {
	dispatch(setLoading());
	const config = {
		"Content-Type": "application/json"
	};

	try {
		const res = await axios.post("/api/users", formData, config);

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: REGISTER_FAIL, payload: err.response.data.id });
		dispatch(setMsg("AUTH_REGISTER_ERROR"));
	}
};

// login user
export const loginUser = (formData) => async (dispatch) => {
	dispatch(setLoading());
	const config = { "Content-Type": "application/json" };

	try {
		const res = await axios.post("/api/auth", formData, config);
		dispatch({ type: LOGIN_SUCCESS, payload: res.data });
		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: LOGIN_FAIL, payload: err.response.data.id });
		dispatch(setMsg("AUTH_LOGIN_ERROR"));
	}
};

// loggout
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

// clear errors
export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
