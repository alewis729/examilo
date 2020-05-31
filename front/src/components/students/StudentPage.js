import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getStudent } from "../../redux/actions/studentActions";
import { setMsg, clearMsg } from "../../redux/actions/messageActions";
import { setAlert } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";
import Preloader from "../utils/Preloader";
import Btn from "../utils/Btn";
import { useSpring, animated as a } from "react-spring";

const StudentPage = ({
	msgs,
	obj,
	loading,
	match,
	history,
	getStudent,
	setMsg,
	clearMsg,
	setAlert
}) => {
	const [displayObj, setDisplayObj] = useState({
		_id: "",
		nameLast: "",
		nameFirst: "",
		code: "",
		group: {}
	});
	const { code, nameLast, nameFirst, group } = displayObj;
	const items = [
		{ key: "Código:", value: code },
		{ key: "Apellidos:", value: nameLast },
		{ key: "Nombres:", value: nameFirst },
		{ key: "Grado:", value: group.name },
		{ key: "Examenes atendidos:", value: 0 },
		{ key: "Examenes no atendidos:", value: 0 }
	];
	const spring = useSpring({
		opacity: 1,
		from: { opacity: 0 }
	});

	useEffect(() => {
		getStudent(match.params.id);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (msgs.includes("STUDENT_FOUND") && obj !== null) {
			clearMsg("STUDENT_FOUND");
			setDisplayObj(obj);
		}
		// eslint-disable-next-line
	}, [msgs, obj]);

	const onEdit = () => {
		history.push("/students");
		setMsg("EDIT_FROM_STUDENT_PAGE");
	};

	const onDownload = () => {
		setAlert(
			"El(la) estudiante no tiene reportes para descargar.",
			"warning",
			5
		);
	};

	return (
		<Fragment>
			<Preloader loading={loading} bgColor="white-1" />
			<a.div style={spring} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						<h1>
							Información de{" "}
							<span className="text--primary">estudiante</span>
						</h1>
					</div>
					<div className="btn--container">
						<Btn
							classNames="btn--primary"
							text="Editar estudiante"
							onClick={onEdit}
						/>

						<Btn
							classNames="btn--blue"
							text="Descargar reportes"
							onClick={onDownload}
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
				<div className="reports student-reports">
					<div className="reports__heading">
						<p className="reports__heading--sub">
							No se encontraron reportes
						</p>
					</div>
				</div>
			</a.div>
		</Fragment>
	);
};

StudentPage.propTypes = {
	msgs: PropTypes.array.isRequired,
	obj: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	getStudent: PropTypes.func.isRequired,
	setMsg: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	obj: state.student.obj,
	loading: state.student.loading
});

export default connect(
	mapStateToProps,
	{ getStudent, setMsg, clearMsg, setAlert }
)(StudentPage);
