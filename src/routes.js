import React from "react";
import { Route, Switch } from "react-router-dom";

import { PageSchool } from "@/components/pages";
// import Register from "@/components/pages/auth/Register";
// import Login from "@/components/pages/auth/Login";
// import SchoolFormHandler from "@/components/pages/school/SchoolFormHandler";
// import Courses from "@/components/pages/courses/Courses";
// import GroupsMain from "@/components/pages/groups/GroupsMain";
// import GroupPage from "@/components/pages/groups/GroupPage";
// import StudentsMain from "@/components/pages/students/StudentsMain";
// import StudentPage from "@/components/pages/students/StudentPage";
// import ExamsMain from "@/components/pages/exams/ExamsMain";
// import ExamPage from "@/components/pages/exams/ExamPage";
// import NotFound from "@/components/pages/pages/NotFound";

const Routes = () => (
	<Switch>
		{/* <Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} /> */}
		<Route exact path="/school" component={PageSchool} />
		{/* <Route exact path="/school/add" component={SchoolFormHandler} />
		<Route exact path="/school/edit" component={SchoolFormHandler} />
		<Route exact path="/courses" component={Courses} />
		<Route exact path="/groups" component={GroupsMain} />
		<Route exact path="/groups/:id" component={GroupPage} />
		<Route exact path="/students" component={StudentsMain} />
		<Route exact path="/students/:id" component={StudentPage} />
		<Route exact path="/exams" component={ExamsMain} />
		<Route exact path="/exams/:id" component={ExamPage} /> */}
		{/* <Route component={NotFound} /> */}
	</Switch>
);

export default Routes;
