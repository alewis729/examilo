import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Register from "../auth/Register";
import Login from "../auth/Login";
import SchoolMain from "../school/SchoolMain";
import SchoolFormHandler from "../school/SchoolFormHandler";
import Courses from "../courses/Courses";
import GroupsMain from "../groups/GroupsMain";
import GroupPage from "../groups/GroupPage";
import StudentsMain from "../students/StudentsMain";
import StudentPage from "../students/StudentPage";
import ExamsMain from "../exams/ExamsMain";
import ExamPage from "../exams/ExamPage";
import NotFound from "../pages/NotFound";

const Routes = () => (
	<Switch>
		<Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} />
		<PrivateRoute exact path="/school" component={SchoolMain} />
		<PrivateRoute exact path="/school/add" component={SchoolFormHandler} />
		<PrivateRoute exact path="/school/edit" component={SchoolFormHandler} />
		<PrivateRoute exact path="/courses" component={Courses} />
		<PrivateRoute exact path="/groups" component={GroupsMain} />
		<PrivateRoute exact path="/groups/:id" component={GroupPage} />
		<PrivateRoute exact path="/students" component={StudentsMain} />
		<PrivateRoute exact path="/students/:id" component={StudentPage} />
		<PrivateRoute exact path="/exams" component={ExamsMain} />
		<PrivateRoute exact path="/exams/:id" component={ExamPage} />
		<Route component={NotFound} />
	</Switch>
);

export default Routes;
