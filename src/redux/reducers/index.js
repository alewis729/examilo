import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import messageReducer from "./messageReducer";
import uploadReducer from "./uploadReducer.js";
import schoolReducer from "./schoolReducer";
import courseReducer from "./courseReducer";
import groupReducer from "./groupReducer";
import studentReducer from "./studentReducer";
import examReducer from "./examReducer";

export default combineReducers({
	auth: authReducer,
	alerts: alertReducer,
	messages: messageReducer,
	uploads: uploadReducer,
	school: schoolReducer,
	course: courseReducer,
	group: groupReducer,
	student: studentReducer,
	exam: examReducer
});
