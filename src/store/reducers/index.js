import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerAlert from "./reducerAlert";
import reducerMessage from "./reducerMessage";
import reducerUpload from "./reducerUpload.js";
import reducerSchool from "./reducerSchool";
import reducerCourse from "./reducerCourse";
import reducerGroup from "./reducerGroup";
import reducerStudent from "./reducerStudent";
import reducerExam from "./reducerExam";

export default combineReducers({
	auth: reducerAuth,
	alerts: reducerAlert,
	messages: reducerMessage,
	uploads: reducerUpload,
	school: reducerSchool,
	course: reducerCourse,
	group: reducerGroup,
	student: reducerStudent,
	exam: reducerExam,
});
