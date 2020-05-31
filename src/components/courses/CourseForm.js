import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	addCourse,
	updateCourse,
	resetCourse
} from "../../redux/actions/courseActions";
import { setAlert, clearAlerts } from "../../redux/actions/alertActions";
import validate from "../../utilFuncs/validate";
import Input from "../utils/Input";
import Btn from "../utils/Btn";

const CourseForm = ({
	obj,
	all,
	setAlert,
	clearAlerts,
	addCourse,
	updateCourse,
	resetCourse
}) => {
	const [formStatus, setFormStatus] = useState("");
	const [formType, setFormType] = useState("ADD");
	const [newObj, setNewObj] = useState({
		name: "",
		abrev: ""
	});
	const [btnText, setBtnText] = useState("Registrar");

	useEffect(() => {
		if (
			formStatus === "REGISTER" &&
			obj !== null &&
			obj.name === newObj.name &&
			obj.abrev === newObj.abrev
		) {
			resetCourse();
			resetForm();
			setFormStatus("");
			setFormType("ADD");
		} else if (
			obj !== null &&
			obj.name !== newObj.name &&
			obj.abrev !== newObj.abrev
		) {
			setFormType("EDIT");
		}
		// eslint-disable-next-line
	}, [obj, formStatus]);

	useEffect(() => {
		if (formType === "ADD") {
			resetForm();
			setBtnText("Registrar curso");
		} else if (formType === "EDIT") {
			setNewObj({
				_id: obj._id,
				name: obj.name,
				abrev: obj.abrev
			});
			setBtnText("Actualizar curso");
		}
		// eslint-disable-next-line
	}, [formType]);

	const onInputChange = (e) => {
		setFormStatus("TOUCHED");
		let value = e.target.value;
		const key = e.target.dataset.key;

		if (e.target.dataset.type === undefined) {
			setNewObj({ ...newObj, [key]: value });
		} else {
			const type = e.target.dataset.type;
			const input = validate(type, value);

			if (input.isValid) {
				setNewObj({ ...newObj, [key]: input.newValue.toUpperCase() });
			}
		}
	};

	const onSubmit = () => {
		clearAlerts();
		if (newObj.name === "" && newObj.abrev === "") {
			setAlert(
				"Los campos obligatorios no fueron llenados o no son validos.",
				"danger"
			);
		} else if (formType === "ADD") {
			let abrevs = [];
			all.forEach((obj) => {
				abrevs.push(obj.abrev.toUpperCase());
			});

			// if the abrev isn't unique
			if (abrevs.includes(newObj.abrev.toUpperCase())) {
				setAlert(
					"La abreviación elegida ya existe para otro curso.",
					"danger"
				);
			} else {
				addCourse(newObj);
				setFormStatus("REGISTER");
			}
		} else if (formType === "EDIT") {
			updateCourse(newObj);
			setFormStatus("REGISTER");
		}
	};

	const onCancel = () => {
		clearAlerts();
		resetForm();
		setFormStatus("");
		setFormType("ADD");
		resetCourse();
	};

	const resetForm = () => {
		setNewObj({
			name: "",
			abrev: ""
		});
	};

	return (
		<div className="course-form s-course--form">
			<div className="course-form--content">
				<h2>
					{formType === "EDIT" ? "Editar" : "Registrar"}
					<span className="text--primary"> curso</span>
				</h2>

				<div className="course-form__items">
					<Input
						objKey="name"
						title="Nombre del curso"
						placeHolder="Insertar nombre del curso"
						value={newObj.name}
						onChange={onInputChange}
					/>

					<Input
						objKey="abrev"
						title="Abreviación del curso"
						placeHolder="Insertar abreviación del curso"
						value={newObj.abrev}
						onChange={onInputChange}
						dataType={"ABREV4"}
					/>
				</div>

				<Btn
					classNames="btn--primary"
					text={btnText}
					onClick={onSubmit}
				/>
				<Btn classNames="btn--red" text="Cancelar" onClick={onCancel} />
			</div>
		</div>
	);
};

CourseForm.propTypes = {
	obj: PropTypes.object,
	all: PropTypes.array,
	setAlert: PropTypes.func.isRequired,
	clearAlerts: PropTypes.func.isRequired,
	addCourse: PropTypes.func.isRequired,
	updateCourse: PropTypes.func.isRequired,
	resetCourse: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	obj: state.course.obj,
	all: state.course.all
});

export default connect(
	mapStateToProps,
	{ setAlert, clearAlerts, addCourse, updateCourse, resetCourse }
)(CourseForm);
