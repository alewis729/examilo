import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroup } from "../../redux/actions/groupActions";
import { setMsg, clearMsg } from "../../redux/actions/messageActions";
import StudentItem from "../students/StudentItem";
import StudentActionsHandlers from "../students/StudentActionsHandlers";
import Preloader from "../utils/Preloader";
import Btn from "../utils/Btn";
import { useSpring, animated as a } from "react-spring";

const GroupPage = ({
	msgs,
	obj,
	loading,
	loadingStudents,
	match,
	history,
	getGroup,
	setMsg,
	clearMsg
}) => {
	const [displayObj, setDisplayObj] = useState({
		_id: "",
		name: "",
		abrev: "",
		students: [],
		exams: [],
		courses: []
	});
	const [activeModal, setActiveModal] = useState("");
	const { name, abrev, students, exams, courses } = displayObj;
	const items = [
		{ key: "Nombre:", value: name },
		{ key: "Abreviación:", value: abrev },
		{ key: "Examenes:", value: exams.length },
		{ key: "Cursos:", value: courses.length },
		{ key: "Estudiantes:", value: students.length }
	];
	const spring = useSpring({
		opacity: 1,
		from: { opacity: 0 }
	});

	useEffect(() => {
		getGroup(match.params.id);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (msgs.includes("GROUP_FOUND") && obj !== null) {
			clearMsg("GROUP_FOUND");
			setDisplayObj(obj);
		} else if (
			msgs.includes("STUDENT_DELETED") ||
			msgs.includes("STUDENTS_DELETED")
		) {
			clearMsg("STUDENT_DELETED");
			clearMsg("STUDENTS_DELETED");
			getGroup(match.params.id);
		}
		// eslint-disable-next-line
	}, [msgs, obj]);

	const onEdit = () => {
		history.push("/groups");
		setMsg("EDIT_FROM_GROUP_PAGE");
	};

	const handleHiddenModals = () => setActiveModal("");

	return (
		<Fragment>
			<StudentActionsHandlers
				setActiveModal={activeModal}
				notifyOfHiddenModals={handleHiddenModals}
			/>
			<Preloader loading={loading} bgColor="white-1" />
			<a.div style={spring} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						<h1>
							Información de{" "}
							<span className="text--primary">grado</span>
						</h1>
					</div>
					<div className="btn--container">
						<Btn
							classNames="btn--primary"
							text="Editar grado"
							onClick={onEdit}
						/>
					</div>
				</div>
				<div className="list list--mid list--auto-height">
					<div className="list--content">
						{items.map((item, i) => (
							<div
								key={i}
								className="list__item list__item--no-hover"
							>
								<p className="list__item--row--3 text--grey">
									{item.key}
								</p>
								<p className="list__item--row--5">
									{item.value}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="group-reports">
					<div className="list">
						<div className="list--content student-list">
							<Preloader
								loading={loadingStudents}
								bgColor="white"
							/>
							<div className="list__title">
								<h2>Estudiantes</h2>
							</div>
							<div className="list__item--special">
								<p className="list__item--code">Código</p>
								<p className="list__item--name-last">
									Apellidos
								</p>
								<p className="list__item--name-first">
									Nombres
								</p>
							</div>
							<div className="list__items-main list__items-main--has-title">
								{students.length > 0 ? (
									students.map((student) => (
										<StudentItem
											obj={student}
											key={student._id}
											groupPage={true}
										/>
									))
								) : (
									<div className="list__item--full-width">
										<p>
											No hay estudiantes para{" "}
											<span className="text--bold">
												{name}
											</span>
											.
										</p>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="list">
						<div className="list--content student-list">
							<Preloader loading={loading} bgColor="white" />
							<div className="list__title">
								<h2>Examenes</h2>
							</div>
							<div className="list__item--special">
								<p className="list__item--code">Código</p>
								<p className="list__item--date">Fecha</p>
								<p className="list__item--exam">Examen</p>
							</div>
							<div className="list__items-main list__items-main--has-title">
								{exams.length > 0 ? (
									exams.map((exam) => <p>exam</p>)
								) : (
									<div className="list__item--full-width">
										<p>
											No hay examenes para{" "}
											<span className="text--bold">
												{name}
											</span>
											.
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</a.div>
		</Fragment>
	);
};

GroupPage.propTypes = {
	msgs: PropTypes.array.isRequired,
	obj: PropTypes.object,
	students: PropTypes.array,
	loading: PropTypes.bool.isRequired,
	loadingStudents: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	getGroup: PropTypes.func.isRequired,
	setMsg: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	obj: state.group.obj,
	loading: state.group.loading,
	loadingStudents: state.student.loading
});

export default connect(
	mapStateToProps,
	{ getGroup, setMsg, clearMsg }
)(GroupPage);
