import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStudent, updateStudent } from "../../redux/actions/studentActions";
import { setAlert, clearAlerts } from "../../redux/actions/alertActions";
import { clearMsg } from "../../redux/actions/messageActions";
import validate from "../../utilFuncs/validate";
import Input from "../utils/Input";
import Btn from "../utils/Btn";
import SelectGroup from "../groups/SelectGroup";

const StudentForm = ({
	msgs,
	obj,
	err,
	setAlert,
	clearAlerts,
	clearMsg,
	addStudent,
	updateStudent
}) => {
	const [formType, setFormType] = useState("ADD");
	const [newObj, setNewObj] = useState({
		nameLast: "",
		nameFirst: "",
		code: "",
		group: ""
	});
	const [btnText, setBtnText] = useState("Registrar");
	const [activeGroup, setActiveGroup] = useState(null);

	useEffect(() => {
		if (msgs.includes("STUDENT_ERROR") && err !== null) {
			clearMsg("STUDENT_ERROR");
			let msg = "Se produjo un error inesperado.";

			if (err === 0) {
				msg += " Acción no autorizada.";
			} else if (err === 3) {
				msg += " El estudiante no fue encontrado.";
			} else if (err === 3.1) {
				msg += " El grado proporcionado no es valido.";
			} else if (err === 3.2) {
				msg += " El grado no fue encontrado.";
			} else if (err === 5) {
				msg += " Algunos campos no son validos.";
			} else if (err === 10) {
				msg +=
					" Ya existe un estudiante con el mismo código de marcación.";
			} else if (err === 11) {
				msg += " Uno o más campos excedieron el limite de caracteres.";
			} else {
				msg += " Intente nuevamente en algunos instantes.";
			}

			setAlert(msg, "danger", 5);
		} else if (
			(msgs.includes("STUDENT_ADDED") ||
				msgs.includes("STUDENT_UPDATED")) &&
			obj !== null
		) {
			resetForm();
			setFormType("ADD");
			clearAlerts();

			if (msgs.includes("STUDENT_ADDED")) {
				clearMsg("STUDENT_ADDED");
				setAlert(
					"El estudiante fue registrado correctamente.",
					"success",
					3
				);
			}

			if (msgs.includes("STUDENT_UPDATED")) {
				clearMsg("STUDENT_UPDATED");
				setAlert(
					"El estudiante fue actualizado correctamente.",
					"success",
					3
				);
			}
		} else if (
			(msgs.includes("STUDENT_FOUND") ||
				msgs.includes("EDIT_FROM_STUDENT_PAGE")) &&
			obj !== null
		) {
			clearMsg("STUDENT_FOUND");
			clearMsg("EDIT_FROM_STUDENT_PAGE");

			if (formType === "EDIT") updateFormWithObject();
			else setFormType("EDIT");
		}
		// eslint-disable-next-line
	}, [obj, msgs, err]);

	useEffect(() => {
		if (formType === "ADD") {
			resetForm();
			setBtnText("Registrar estudiante");
		} else if (formType === "EDIT") {
			updateFormWithObject();
			setBtnText("Actualizar estudiante");
		}
		// eslint-disable-next-line
	}, [formType]);

	const onInputChange = (e) => {
		let value = e.target.value;
		const key = e.target.dataset.key;
		const inputType = e.target.dataset.type;

		if (inputType === undefined) {
			setNewObj({ ...newObj, [key]: value });
		} else {
			const limit = e.target.dataset.limit;
			const input = validate(inputType, value, limit);

			if (input.isValid) {
				const newVal = input.newValue;
				setNewObj({ ...newObj, [key]: newVal });
			}
		}
	};

	const setGroup = (item) => {
		setActiveGroup(item);
		if (item !== null && item.value)
			setNewObj({ ...newObj, group: item.value });
		else setNewObj({ ...newObj, group: "" }); // if no option received from select
	};

	const onSubmit = () => {
		if (
			newObj.nameLast === "" ||
			newObj.nameFirst === "" ||
			newObj.code === ""
		) {
			setAlert(
				"Los campos obligatorios (apellidos, nombres y/o código) no fueron llenados."
			);
		} else if (newObj.group === "") {
			setAlert("El grado a matricular no fue especificado.");
		} else {
			if (formType === "ADD") addStudent(newObj);
			else if (formType === "EDIT") updateStudent(newObj);
		}
	};

	const onCancel = () => {
		setFormType("ADD");
		resetForm();
	};

	const resetForm = () => {
		setGroup(null);
		setNewObj({
			nameLast: "",
			nameFirst: "",
			code: "",
			group: ""
		});
	};

	const updateFormWithObject = () => {
		setGroup({ value: obj.group._id, label: obj.group.name });
		setNewObj({
			_id: obj._id,
			nameLast: obj.nameLast,
			nameFirst: obj.nameFirst,
			code: obj.code,
			group: obj.group._id
		});
	};

	return (
		<div className="student-form s-student--form">
			<div className="student-form--content">
				<h2>
					{formType === "EDIT" ? "Editar" : "Registrar"}
					<span className="text--primary"> estudiante</span>
				</h2>

				<div className="student-form__items">
					<Input
						objKey="nameLast"
						title="Apellidos del estudiante"
						placeHolder="Insertar apellidos del estudiante"
						value={newObj.nameLast}
						onChange={onInputChange}
						dataType={"NAMES"}
					/>

					<Input
						objKey="nameFirst"
						title="Nombres del estudiante"
						placeHolder="Insertar nombres del estudiante"
						value={newObj.nameFirst}
						onChange={onInputChange}
						dataType={"NAMES"}
					/>

					<Input
						objKey="code"
						title="Código de marcación"
						placeHolder="Insertar código de marcación"
						value={newObj.code}
						onChange={onInputChange}
						dataType={"NATURAL_LIMIT"}
						dataLimit="6"
					/>

					<SelectGroup returnGroup={setGroup} active={activeGroup} />
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

StudentForm.propTypes = {
	msgs: PropTypes.array.isRequired,
	obj: PropTypes.object,
	setAlert: PropTypes.func.isRequired,
	clearAlerts: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired,
	addStudent: PropTypes.func.isRequired,
	updateStudent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	obj: state.student.obj,
	err: state.student.error
});

export default connect(
	mapStateToProps,
	{
		setAlert,
		clearAlerts,
		clearMsg,
		addStudent,
		updateStudent
	}
)(StudentForm);
