import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	addGroup,
	updateGroup,
	resetGroup
} from "../../redux/actions/groupActions";
import { setAlert, clearAlerts } from "../../redux/actions/alertActions";
import { clearMsg } from "../../redux/actions/messageActions";
import validate from "../../utilFuncs/validate";
import Input from "../utils/Input";
import Btn from "../utils/Btn";

const GroupForm = ({
	msgs,
	obj,
	setAlert,
	clearAlerts,
	clearMsg,
	addGroup,
	updateGroup
}) => {
	const [formType, setFormType] = useState("ADD");
	const [newObj, setNewObj] = useState({
		name: "",
		abrev: "",
		desc: "",
		color: "yellow"
	});
	const [btnText, setBtnText] = useState("Registrar");
	const [colors, setColors] = useState({
		all: ["yellow", "blue", "purple", "celeste", "green", "red"],
		active: "yellow"
	});

	useEffect(() => {
		if (
			(msgs.includes("GROUP_ADDED") || msgs.includes("GROUP_UPDATED")) &&
			obj !== null
		) {
			resetForm();
			setFormType("ADD");
			clearAlerts();

			if (msgs.includes("GROUP_ADDED")) {
				clearMsg("GROUP_ADDED");
				setAlert(
					"El grado fue registrado correctamente.",
					"success",
					3
				);
			}

			if (msgs.includes("GROUP_UPDATED")) {
				clearMsg("GROUP_UPDATED");
				setAlert(
					"El grado fue actualizado correctamente.",
					"success",
					3
				);
			}
		} else if (
			(msgs.includes("GROUP_FOUND") ||
				msgs.includes("EDIT_FROM_GROUP_PAGE")) &&
			obj !== null
		) {
			if (formType === "EDIT") updateFormWithObject();
			else setFormType("EDIT");

			clearMsg("GROUP_FOUND");
			clearMsg("EDIT_FROM_GROUP_PAGE");
			console.log("boom");
		}
		// eslint-disable-next-line
	}, [obj, msgs]);

	useEffect(() => {
		if (formType === "ADD") {
			resetForm();
			setBtnText("Registrar grado");
		} else if (formType === "EDIT") {
			updateFormWithObject();
			setBtnText("Actualizar grado");
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

			if (input.isValid && inputType === "ABREV6") {
				setNewObj({ ...newObj, [key]: input.newValue.toUpperCase() });
			} else if (input.isValid && inputType) {
				setNewObj({ ...newObj, [key]: input.newValue });
			}
		}
	};

	const onColorChange = (e) => {
		setColors({ ...colors, active: e.target.dataset.color });
		setNewObj({ ...newObj, color: e.target.dataset.color });
	};

	const onSubmit = async () => {
		if (newObj.name === "" || newObj.abrev === "") {
			setAlert(
				"Los campos obligatorios (nombre y/o abreviación) no fueron llenados."
			);
		} else {
			if (formType === "ADD") addGroup(newObj);
			else if (formType === "EDIT") updateGroup(newObj);
		}
	};

	const onCancel = () => {
		setFormType("ADD");
		resetForm();
	};

	const resetForm = () => {
		console.log("i want to reset the form");
		setColors({ ...colors, active: "yellow" });
		setNewObj({
			name: "",
			abrev: "",
			desc: "",
			color: "yellow"
		});
	};

	const updateFormWithObject = () => {
		console.log("i run");
		setColors({ ...colors, active: obj.color });
		setNewObj({
			_id: obj._id,
			name: obj.name,
			abrev: obj.abrev,
			desc: obj.desc,
			color: obj.color
		});
	};

	return (
		<div className="group-form s-group--form">
			<div className="group-form--content">
				<h2>
					{formType === "EDIT" ? "Editar" : "Registrar"}
					<span className="text--primary"> grado</span>
				</h2>

				<div className="group-form__items">
					<Input
						objKey="name"
						title="Nombre del grado"
						placeHolder="Insertar nombre del grado"
						value={newObj.name}
						onChange={onInputChange}
						dataType={"SHORT_DESC"}
					/>

					<Input
						objKey="abrev"
						title="Abreviación del grado"
						placeHolder="Insertar abreviación del grado"
						value={newObj.abrev}
						onChange={onInputChange}
						dataType={"ABREV6"}
					/>

					<Input
						objKey="desc"
						title="Descripción del grado"
						placeHolder="Insertar nombre del grado"
						value={newObj.desc}
						onChange={onInputChange}
						dataType={"SHORT_DESC"}
					/>

					<div className="u-colors">
						<div className="u-colors--title">Color principal</div>
						<div className="u-colors--content">
							{colors.all.map((color) => (
								<div
									className={
										`u-colors--item u-colors--item--${color} ` +
										(colors.active === color
											? "u-colors--item--active"
											: "")
									}
									key={color}
									data-color={color}
									onClick={onColorChange}
								/>
							))}
						</div>
					</div>
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

GroupForm.propTypes = {
	msgs: PropTypes.array.isRequired,
	obj: PropTypes.object,
	setAlert: PropTypes.func.isRequired,
	clearAlerts: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired,
	addGroup: PropTypes.func.isRequired,
	updateGroup: PropTypes.func.isRequired,
	resetGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	obj: state.group.obj
});

export default connect(
	mapStateToProps,
	{ setAlert, clearAlerts, clearMsg, addGroup, updateGroup, resetGroup }
)(GroupForm);
