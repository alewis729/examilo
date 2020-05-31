import {
	SET_GROUP_LOADING,
	GET_ALL_GROUPS,
	GET_GROUP,
	ADD_GROUP,
	UPDATE_GROUP,
	DELETE_GROUP,
	GROUP_ERROR,
	RESET_GROUP,
	CLEAR_GROUP_ERRORS,
	FILTER_GROUPS,
	CLEAR_FILTER_GROUPS
} from "../types";

const initialState = {
	loading: false,
	error: null,
	obj: null,
	all: [],
	filtered: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_GROUP_LOADING:
			return {
				...state,
				loading: true
			};
		case GROUP_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case CLEAR_GROUP_ERRORS:
			return {
				...state,
				error: null
			};
		case GET_ALL_GROUPS:
			return {
				...state,
				loading: false,
				all: action.payload
			};
		case GET_GROUP:
			return {
				...state,
				loading: false,
				obj: action.payload
			};
		case ADD_GROUP:
			return {
				...state,
				loading: false,
				all: [action.payload, ...state.all],
				obj: action.payload
			};
		case UPDATE_GROUP:
			return {
				...state,
				loading: false,
				all: state.all.map((obj) =>
					obj._id === action.payload._id ? action.payload : obj
				),
				obj: action.payload
			};
		case DELETE_GROUP:
			return {
				...state,
				loading: false,
				all: state.all.filter((obj) => obj._id !== action.payload),
				obj: null
			};
		case RESET_GROUP:
			return {
				...state,
				loading: false,
				obj: null
			};
		case FILTER_GROUPS:
			return {
				...state,
				filtered: state.all.filter((obj) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					const str = `${obj.name} ${obj.abrev} ${obj.name}`;

					return str.match(regex);
				})
			};
		case CLEAR_FILTER_GROUPS:
			return {
				...state,
				filtered: []
			};
		default:
			return state;
	}
};
