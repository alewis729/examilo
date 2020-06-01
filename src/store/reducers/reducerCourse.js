import {
	SET_COURSE_LOADING,
	GET_ALL_COURSES,
	GET_COURSE,
	ADD_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	COURSE_ERROR,
	RESET_COURSE,
	CLEAR_COURSE_ERRORS
} from "../types";

const initialState = {
	loading: false,
	error: null,
	obj: null,
	all: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_COURSE_LOADING:
			return {
				...state,
				loading: true
			};
		case COURSE_ERROR:
			return {
				...state,
				error: action.payload
			};
		case CLEAR_COURSE_ERRORS:
			return {
				...state,
				error: null
			};
		case GET_ALL_COURSES:
			return {
				...state,
				loading: false,
				all: action.payload
			};
		case GET_COURSE:
			return {
				...state,
				loading: false,
				obj: action.payload
			};
		case ADD_COURSE:
			return {
				...state,
				loading: false,
				all: [action.payload, ...state.all],
				obj: action.payload
			};
		case UPDATE_COURSE:
			return {
				...state,
				loading: false,
				all: state.all.map((obj) =>
					obj._id === action.payload._id ? action.payload : obj
				),
				obj: action.payload
			};
		case DELETE_COURSE:
			return {
				...state,
				loading: false,
				all: state.all.filter((obj) => obj._id !== action.payload),
				obj: null
			};
		case RESET_COURSE:
			return {
				...state,
				loading: false,
				obj: null
			};
		default:
			return state;
	}
};
