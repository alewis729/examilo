import {
	SET_STUDENT_LOADING,
	STUDENT_ERROR,
	CLEAR_STUDENT_ERRORS,
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
import { permutateArrToStr } from "../../utilFuncs/other";

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
		case SET_STUDENT_LOADING:
			return {
				...state,
				loading: true
			};
		case STUDENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_STUDENT_ERRORS:
			return {
				...state,
				error: null
			};
		case GET_ALL_STUDENTS:
			return {
				...state,
				loading: false,
				all: action.payload
			};
		case GET_STUDENT:
			return {
				...state,
				loading: false,
				obj: action.payload
			};
		case ADD_STUDENT:
			return {
				...state,
				loading: false,
				all: [action.payload, ...state.all],
				obj: action.payload
			};
		case ADD_MANY_STUDENTS:
			return {
				...state,
				loading: false,
				all: action.payload.concat(state.all)
			};
		case UPDATE_STUDENT:
			return {
				...state,
				loading: false,
				all: state.all.map((obj) =>
					obj._id === action.payload._id ? action.payload : obj
				),
				obj: action.payload
			};
		case UPDATE_MANY_STUDENTS:
			return {
				...state,
				loading: false,
				all: state.all.map((obj) => {
					// not optimal for prod
					const arr = action.payload.filter(
						(item) => item._id === obj._id
					);
					if (arr.length > 0) return arr[0];
					else return obj;
				}),
				selected: []
			};
		case DELETE_STUDENT:
			return {
				...state,
				loading: false,
				all: state.all.filter((obj) => obj._id !== action.payload),
				selected: state.selected.filter(
					(obj) => obj._id !== action.payload
				),
				obj: null
			};
		case DELETE_MANY_STUDENTS:
			return {
				...state,
				loading: false,
				all: state.all.filter(
					(obj) => !action.payload.includes(obj._id)
				),
				selected: []
			};
		case RESET_STUDENT:
			return {
				...state,
				loading: false,
				obj: null
			};
		case SELECT_STUDENT:
			return {
				...state,
				loading: false,
				selected: [action.payload, ...state.selected]
			};
		case UNSELECT_STUDENT:
			return {
				...state,
				loading: false,
				selected: state.selected.filter(
					(item) => item._id !== action.payload
				)
			};
		case SELECT_ALL_STUDENTS:
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
		case CLEAR_STUDENT_SELECTIONS:
			return {
				...state,
				loading: false,
				selected: []
			};
		case FILTER_STUDENTS:
			return {
				...state,
				filtered: state.all.filter((obj) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					const fullNameArr = `${obj.nameFirst} ${obj.nameLast}`.split(
						" "
					);
					const namePerm = permutateArrToStr(fullNameArr); // dev mode: if it takes too long, just dont do the permutations, instead match nameLast and nameFirst separately
					if (obj.group === null) {
						return (
							namePerm.match(regex) ||
							obj.code.toString().match(regex) ||
							"sin grupo".match(regex)
						);
					}
					return (
						namePerm.match(regex) ||
						obj.code.toString().match(regex) ||
						obj.group.name.match(regex) ||
						obj.group.abrev.match(regex)
					);
				})
			};
		case CLEAR_FILTER_STUDENTS:
			return {
				...state,
				filtered: []
			};
		default:
			return state;
	}
};
