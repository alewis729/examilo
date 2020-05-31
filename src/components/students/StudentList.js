import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { selectAll, clearSelection } from "../../redux/actions/studentActions";
import PropTypes from "prop-types";
import StudentItem from "./StudentItem";
import Checkbox from "../utils/Checkbox";
import Preloader from "../utils/Preloader";

const StudentList = ({
	students,
	all,
	selected,
	loading,
	selectAll,
	clearSelection
}) => {
	const [isMainChecked, setIsMainChecked] = useState(false);
	const [chbState, setChbState] = useState(0);

	useEffect(() => {
		if (selected.length === 0) setIsMainChecked(false);
		if (selected.length > 0 && selected.length === all.length) {
			setChbState(2);
		} else if (selected.length > 0) setChbState(1);
		else setChbState(0);
		// eslint-disable-next-line
	}, [selected]);

	const handleChange = () => {
		if (selected.length > 0) {
			clearSelection();
			setIsMainChecked(false);
		} else {
			if (isMainChecked) clearSelection();
			else selectAll();

			setIsMainChecked(!isMainChecked);
		}
	};

	return (
		<div className="list">
			<div className="list--content student-list">
				<Preloader loading={loading} bgColor="white" />
				<div className="list__item--special">
					<input
						type="checkbox"
						id="student-list-checkbox-1"
						className="list__item--checkbox list__item--checkbox--special"
						checked={isMainChecked}
						onChange={handleChange}
					/>
					<label
						htmlFor="student-list-checkbox-1"
						className="list__item--checkbox__label"
					>
						<Checkbox
							state={chbState}
							className="list__item--checkbox__label--icon"
						/>
					</label>
					<p className="list__item--code">Código</p>
					<p className="list__item--name-last">Apellidos</p>
					<p className="list__item--name-first">Nombres</p>
					<p className="list__item--group">Grado</p>
				</div>
				<div className="list__items-main">
					{students.length > 0 &&
						students.map((student) => (
							<StudentItem obj={student} key={student._id} />
						))}
				</div>
			</div>
		</div>
	);
};

StudentList.propTypes = {
	students: PropTypes.array.isRequired,
	all: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	selectAll: PropTypes.func.isRequired,
	clearSelection: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	all: state.student.all,
	selected: state.student.selected,
	loading: state.student.loading
});

export default connect(
	mapStateToProps,
	{ selectAll, clearSelection }
)(StudentList);
