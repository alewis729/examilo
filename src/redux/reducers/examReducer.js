import {
	SET_EXAM_LOADING,
	EXAM_ERROR,
	CLEAR_EXAM_ERRORS,
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

const initialState = {
	loading: false,
	error: null,
	obj: null,
	all: [],
	selected: [],
	filtered: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_EXAM_LOADING:
			return {
				...state,
				loading: true
			};
		case EXAM_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_EXAM_ERRORS:
			return {
				...state,
				error: null
			};
		case GET_ALL_EXAMS:
			return {
				...state,
				loading: false,
				all: action.payload
			};
		case GET_EXAM:
			return {
				...state,
				loading: false,
				obj: action.payload
			};
		case ADD_EXAM:
			return {
				...state,
				loading: false,
				all: [action.payload, ...state.all],
				obj: action.payload
			};
		case UPDATE_EXAM:
			return {
				...state,
				loading: false,
				all: state.all.map((obj) =>
					obj._id === action.payload._id ? action.payload : obj
				),
				obj: action.payload
			};
		case DELETE_EXAM:
			return {
				...state,
				loading: false,
				all: state.all.filter((obj) => obj._id !== action.payload),
				selected: state.selected.filter(
					(obj) => obj._id !== action.payload
				),
				obj: null
			};
		case DELETE_MANY_EXAMS:
			return {
				...state,
				loading: false,
				all: state.all.filter(
					(obj) => !action.payload.includes(obj._id)
				),
				selected: []
			};
		case SELECT_EXAM:
			return {
				...state,
				loading: false,
				selected: [action.payload, ...state.selected]
			};
		case UNSELECT_EXAM:
			return {
				...state,
				loading: false,
				selected: state.selected.filter(
					(item) => item._id !== action.payload
				)
			};
		case SELECT_ALL_EXAMS:
			if (state.filtered.length === 0) {
				return {
					...state,
					loading: false,
					selected: state.all
				};
			} else {
				return {
					...state,
					loading: false,
					selected: state.filtered
				};
			}
		case CLEAR_EXAM_SELECTIONS:
			return {
				...state,
				loading: false,
				selected: []
			};
		case FILTER_EXAMS:
			return {
				...state,
				filtered: state.all.filter((obj) => {
					const regex = new RegExp(`${action.payload}`, "gi");

					return (
						obj.name.toString().match(regex) ||
						obj.abrev.match(regex) ||
						obj.group.name.match(regex) ||
						obj.group.abrev.match(regex)
					);
				})
			};
		case CLEAR_FILTER_EXAMS:
			return {
				...state,
				filtered: []
			};
		default:
			return state;
	}
};
