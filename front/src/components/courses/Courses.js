import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import Filter from "../layout/Filter";
import CourseForm from "./CourseForm";
import CourseItem from "./CourseItem";
import Preloader from "../utils/Preloader";
import { useTransition, animated as a } from "react-spring";

const Courses = ({ all, loading, getAllCourses }) => {
	const transitions = useTransition(loading, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	useEffect(() => {
		getAllCourses();
		// eslint-disable-next-line
	}, []);

	const handleFilter = (text) => {
		console.log(text);
	};

	return transitions.map(({ item, key, props }) =>
		item ? (
			<a.div style={props} key={key}>
				<Preloader loading={loading} />
			</a.div>
		) : (
			<a.div style={props} key={key} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						<h1>Cursos</h1>
					</div>
					<Filter searchFor="curso" returnText={handleFilter} />
				</div>
				<div className="s-course">
					<CourseForm />
					{all.length > 0 &&
						all.map((obj) => (
							<CourseItem course={obj} key={obj._id} />
						))}
				</div>
			</a.div>
		)
	);
};

Courses.propTypes = {
	all: PropTypes.array,
	loading: PropTypes.bool.isRequired,
	getAllCourses: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	all: state.course.all,
	loading: state.course.loading
});

export default connect(
	mapStateToProps,
	{ getAllCourses }
)(Courses);
