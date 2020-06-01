import {
	SET_UPLOADS_LOADING,
	CLEAR_ERRORS,
	UPLOAD_SCHOOL_LOGO,
	UPLOAD_SCHOOL_LOGO_ERROR,
	UPLOAD_EXCEL_STUDENTS,
	EXCEL_STUDENTS_ERROR
} from "../types";

const initialState = {
	loading: false,
	logo: null,
	error: null,
	students: { all: [], duplicates: 0 }
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_UPLOADS_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		case UPLOAD_SCHOOL_LOGO:
			return {
				...state,
				loading: false,
				logo: action.payload
			};
		case UPLOAD_SCHOOL_LOGO_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null
			};
		case UPLOAD_EXCEL_STUDENTS:
			return {
				...state,
				loading: false,
				students: action.payload
			};
		case EXCEL_STUDENTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};
