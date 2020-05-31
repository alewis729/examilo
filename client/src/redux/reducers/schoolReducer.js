import {
	SET_SCHOOL_LOADING,
	SCHOOL_ERROR,
	CLEAR_ERRORS,
	ADD_SCHOOL,
	GET_SCHOOL,
	UPDATE_SCHOOL,
	DELETE_SCHOOL
} from "../types";

const initialState = {
	obj: null,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SCHOOL_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		case GET_SCHOOL:
			return {
				...state,
				obj: action.payload,
				loading: false
			};
		case UPDATE_SCHOOL:
			return {
				...state,
				obj: action.payload,
				loading: false
			};
		case ADD_SCHOOL:
			return {
				...state,
				obj: action.payload,
				loading: false
			};
		case DELETE_SCHOOL:
			return {
				...state,
				obj: null,
				loading: false
			};
		case SCHOOL_ERROR:
			return {
				...state,
				obj: null,
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
