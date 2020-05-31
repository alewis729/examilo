import {
	SET_GROUP_LOADING,
	GET_ALL_GROUPS,
	GET_GROUP,
	ADD_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	GROUP_ERROR,
	RESET_GROUP,
	FILTER_GROUPS,
	CLEAR_FILTER_GROUPS
} from "../types";
import { setMsg } from "./messageActions";
import axios from "axios";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_GROUP_LOADING });
};

// set error
const setError = (err) => (dispatch) => {
	dispatch({ type: GROUP_ERROR, payload: err.response.data.id });
};

// get all groups
export const getAllGroups = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/groups`);

		dispatch({ type: GET_ALL_GROUPS, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// get group
export const getGroup = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/groups/${id}`);
		dispatch({ type: GET_GROUP, payload: res.data });
		dispatch(setMsg("GROUP_FOUND"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// add group
export const addGroup = (group) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post(`/api/groups`, group, config);
		dispatch({ type: ADD_GROUP, payload: res.data });
		dispatch(setMsg("GROUP_ADDED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// update group
export const updateGroup = (group) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(`/api/groups/${group._id}`, group, config);
		dispatch({ type: UPDATE_GROUP, payload: res.data });
		dispatch(setMsg("GROUP_UPDATED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// delete group
export const deleteGroup = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await axios.delete(`/api/groups/${id}`);
		dispatch({ type: DELETE_GROUP, payload: id });
		dispatch(setMsg("GROUP_DELETED"));
	} catch (err) {
		console.log(err);
		// dispatch(setError(err));
	}
};

// reset group
export const resetGroup = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: RESET_GROUP });
};

// filter objects
export const filterItems = (text) => (dispatch) => {
	dispatch({ type: FILTER_GROUPS, payload: text });
};

// clear filter
export const clearFilter = () => (dispatch) => {
	dispatch({ type: CLEAR_FILTER_GROUPS });
};
