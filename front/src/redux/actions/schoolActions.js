import {
	SET_SCHOOL_LOADING,
	ADD_SCHOOL,
	GET_SCHOOL,
	SCHOOL_ERROR,
	UPDATE_SCHOOL,
	DELETE_SCHOOL
} from "../types";
import axios from "axios";
import { setMsg } from "./messageActions";

// set loading
const setLoading = () => (dispatch) => dispatch({ type: SET_SCHOOL_LOADING });

// set error
const setError = (err) => (dispatch) => {
	dispatch({ type: SCHOOL_ERROR, payload: err.response.data.id });
	dispatch(setMsg("SCHOOL_ERROR"));
};

// get school
export const getSchool = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/schools`);

		dispatch({ type: GET_SCHOOL, payload: res.data });
		dispatch(setMsg("SCHOOL_FOUND"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// add school
export const addSchool = (school) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post("/api/schools", school, config);
		dispatch({ type: ADD_SCHOOL, payload: res.data });
		dispatch(setMsg("SCHOOL_ADDED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// update school
export const updateSchool = (school) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(
			`/api/schools/${school._id}`,
			school,
			config
		);
		dispatch({ type: UPDATE_SCHOOL, payload: res.data });
		dispatch(setMsg("SCHOOL_UPDATED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// delete school
export const removeSchool = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await axios.delete(`/api/schools/${id}`);
		dispatch({ type: DELETE_SCHOOL, payload: id });
	} catch (err) {
		dispatch(setError(err));
	}
};
