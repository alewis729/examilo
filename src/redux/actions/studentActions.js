import {
	SET_STUDENT_LOADING,
	STUDENT_ERROR,
	GET_ALL_STUDENTS,
	GET_STUDENT,
	ADD_STUDENT,
	ADD_MANY_STUDENTS,
	UPDATE_STUDENT,
	UPDATE_MANY_STUDENTS,
	DELETE_STUDENT,
	DELETE_MANY_STUDENTS,
	RESET_STUDENT,
	SELECT_STUDENT,
	UNSELECT_STUDENT,
	SELECT_ALL_STUDENTS,
	CLEAR_STUDENT_SELECTIONS,
	FILTER_STUDENTS,
	CLEAR_FILTER_STUDENTS
} from "../types";
import { setMsg } from "./messageActions";
import axios from "axios";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_STUDENT_LOADING });
};

// set error
const setError = (err) => (dispatch) => {
	dispatch({ type: STUDENT_ERROR, payload: err.response.data.id });
	dispatch(setMsg("STUDENT_ERROR"));
};

// get all
export const getAllStudents = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/students`);
		dispatch({ type: GET_ALL_STUDENTS, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// get one
export const getStudent = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/students/${id}`);
		dispatch({ type: GET_STUDENT, payload: res.data });
		dispatch(setMsg("STUDENT_FOUND"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// add one
export const addStudent = (student) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post(`/api/students`, student, config);
		dispatch({ type: ADD_STUDENT, payload: res.data });
		dispatch(setMsg("STUDENT_ADDED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// add many
export const addManyStudents = (students) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post(`/api/students/many`, students, config);
		dispatch({ type: ADD_MANY_STUDENTS, payload: res.data });
		dispatch(setMsg("STUDENTS_ADDED"));
	} catch (err) {
		dispatch(setError(err));
		dispatch(setMsg("STUDENTS_ADD_MANY_ERROR"));
	}
};

// update one
export const updateStudent = (student) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(
			`/api/students/one/${student._id}`,
			student,
			config
		);
		dispatch({ type: UPDATE_STUDENT, payload: res.data });
		dispatch(setMsg("STUDENT_UPDATED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// update many
export const updateMany = (group, ids) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" },
		group,
		data: ids
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(`/api/students/many`, config);
		dispatch({ type: UPDATE_MANY_STUDENTS, payload: res.data });
		dispatch(setMsg("STUDENTS_UPDATED"));
	} catch (err) {
		dispatch(setError(err));
		dispatch(setMsg("STUDENTS_UPDATE_MANY_ERROR"));
	}
};

// delete one
export const deleteStudent = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await axios.delete(`/api/students/one/${id}`);
		dispatch({ type: DELETE_STUDENT, payload: id });
		dispatch(setMsg("STUDENT_DELETED")); // remember to handle possible errors
	} catch (err) {
		console.log(err); // remember to handle possible errors
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
		await axios.delete(`/api/students/many`, config);
		dispatch({ type: DELETE_MANY_STUDENTS, payload: ids });
		dispatch(setMsg("STUDENTS_DELETED"));
	} catch (err) {
		dispatch(setError(err));
	}
};

// reset object
export const resetStudent = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: RESET_STUDENT });
};

// filter items
export const filterItems = (text) => (dispatch) => {
	dispatch({ type: FILTER_STUDENTS, payload: text });
};

// clear filter
export const clearFilter = () => (dispatch) => {
	dispatch({ type: CLEAR_FILTER_STUDENTS });
};

// select item
export const selectItem = (obj) => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: SELECT_STUDENT, payload: obj });
};

// unselect item
export const unselectItem = (id) => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: UNSELECT_STUDENT, payload: id });
};

// select all
export const selectAll = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: SELECT_ALL_STUDENTS });
};

// clear selection
export const clearSelection = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: CLEAR_STUDENT_SELECTIONS });
};
