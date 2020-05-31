import {
	SET_UPLOADS_LOADING,
	UPLOAD_SCHOOL_LOGO,
	UPLOAD_SCHOOL_LOGO_ERROR,
	UPLOAD_EXCEL_STUDENTS,
	EXCEL_STUDENTS_ERROR
} from "../types";
import axios from "axios";
import { setMsg } from "./messageActions";
import { validateStudents } from "../../utilFuncs/other";

// set loading
const setLoading = () => (dispatch) => {
	dispatch({ type: SET_UPLOADS_LOADING });
};

// upload school logo
export const uploadLogo = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};

	try {
		dispatch(setLoading());
		const res = await axios.post("/api/uploads", formData, config);

		dispatch({ type: UPLOAD_SCHOOL_LOGO, payload: res.data });
	} catch (err) {
		dispatch({
			type: UPLOAD_SCHOOL_LOGO_ERROR,
			payload: err.response.data.id
		});
		dispatch(setMsg("SCHOOL_LOGO_ERROR"));
	}
};

// upload excel of students
export const uploadExcel = (formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};

	try {
		dispatch(setLoading());
		const res = await axios.post("/api/uploads/students", formData, config);
		const students = validateStudents(res.data);

		if (students.duplicates > 0) {
			dispatch(setMsg("EXCEL_STUDENTS_UPLOAD_DUPLICATES"));
		} else if (students.msg !== "") {
			dispatch(setMsg("EXCEL_STUDENTS_UPLOAD_LIMIT_REACHED"));
		} else {
			dispatch(setMsg("EXCEL_STUDENTS_UPLOAD_SUCCESS"));
		}

		dispatch({ type: UPLOAD_EXCEL_STUDENTS, payload: students });
	} catch (err) {
		console.log(err, err.response);
		dispatch({ type: EXCEL_STUDENTS_ERROR, payload: err.response.data.id });
		dispatch(setMsg("EXCEL_STUDENTS_UPLOAD_ERROR"));
	}
};
