import {
	SET_EXAM_LOADING,
	EXAM_ERROR,
	GET_ALL_EXAMS,
	GET_EXAM,
	ADD_EXAM,
	UPDATE_EXAM,
	DELETE_EXAM,
	DELETE_MANY_EXAMS,
	SELECT_EXAM,
	UNSELECT_EXAM,
	SELECT_ALL_EXAMS,
	CLEAR_EXAM_SELECTIONS,
	FILTER_EXAMS,
	CLEAR_FILTER_EXAMS
} from "../types";
import { setMsg } from "./messageActions";
import axios from "axios";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_EXAM_LOADING });
};

// set error
const setError = (err) => (dispatch) => {
	dispatch({ type: EXAM_ERROR, payload: err.response.data.id });
};

// get all
export const getAllExams = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/exams`);
		dispatch({ type: GET_ALL_EXAMS, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// get one
export const getExam = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/exams/${id}`);
		dispatch({ type: GET_EXAM, payload: res.data });
		dispatch(setMsg("EXAM_FOUND"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// add one
export const addExam = (exam) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post(`/api/exams`, exam, config);
		dispatch({ type: ADD_EXAM, payload: res.data });
		dispatch(setMsg("EXAM_ADDED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// update one
export const updateExam = (exam) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(`/api/exams/one/${exam._id}`, exam, config);
		dispatch({ type: UPDATE_EXAM, payload: res.data });
		dispatch(setMsg("EXAM_UPDATED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// delete one
export const deleteExam = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await axios.delete(`/api/exams/one/${id}`);
		dispatch({ type: DELETE_EXAM, payload: id });
		dispatch(setMsg("EXAM_DELETED"));
	} catch (err) {
		console.log(err);
		dispatch(setError(err));
	}
};

// delete many
export const deleteMany = (ids) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" },
		data: ids
	};

	try {
		dispatch(setLoading());
		await axios.delete(`/api/exams/many`, config);
		dispatch({ type: DELETE_MANY_EXAMS, payload: ids });
		dispatch(setMsg("EXAMS_DELETED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// filter items
export const filterItems = (text) => (dispatch) => {
	dispatch({ type: FILTER_EXAMS, payload: text });
};

// clear filter
export const clearFilter = () => (dispatch) => {
	dispatch({ type: CLEAR_FILTER_EXAMS });
};

// select item
export const selectItem = (obj) => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: SELECT_EXAM, payload: obj });
};

// unselect item
export const unselectItem = (id) => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: UNSELECT_EXAM, payload: id });
};

// select all
export const selectAll = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: SELECT_ALL_EXAMS });
};

// clear selection
export const clearSelection = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: CLEAR_EXAM_SELECTIONS });
};
