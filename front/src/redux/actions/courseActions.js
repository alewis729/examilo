import {
	SET_COURSE_LOADING,
	GET_ALL_COURSES,
	GET_COURSE,
	ADD_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	COURSE_ERROR,
	RESET_COURSE
} from "../types";
import axios from "axios";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_COURSE_LOADING });
};

// set error
const setError = (err) => (dispatch) => {
	dispatch({ type: COURSE_ERROR, payload: err.response.data.id });
};

// get all courses
export const getAllCourses = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`/api/courses`);

		dispatch({ type: GET_ALL_COURSES, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// get course
export const getCourse = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		const res = await axios.get(`api/courses/${id}`);
		dispatch({ type: GET_COURSE, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// add course
export const addCourse = (course) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.post(`api/courses`, course, config);
		dispatch({ type: ADD_COURSE, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// update course
export const updateCourse = (course) => async (dispatch) => {
	const config = {
		headers: { "Content-Type": "application/json" }
	};

	try {
		dispatch(setLoading());
		const res = await axios.put(
			`/api/courses/${course._id}`,
			course,
			config
		);
		dispatch({ type: UPDATE_COURSE, payload: res.data });
	} catch (err) {
		dispatch(setError(err));
	}
};

// delete course
export const deleteCourse = (id) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await axios.delete(`/api/courses/${id}`);
		dispatch({ type: DELETE_COURSE, payload: id });
	} catch (err) {
		console.log(err);
		// dispatch(setError(err));
	}
};

// reset course
export const resetCourse = () => (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: RESET_COURSE });
};
