import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	addSchool,
	getSchool,
	updateSchool
} from "../../redux/actions/schoolActions";
import { uploadLogo } from "../../redux/actions/uploadActions";
import Modal from "../utils/Modal";
import { setAlert } from "../../redux/actions/alertActions";
import { clearMsg } from "../../redux/actions/messageActions";
import SchoolForm from "./SchoolForm";
import Preloader from "../utils/Preloader";

const SchoolFormHandler = ({
	msgs,
	obj,
	logo,
	loading,
	err,
	logoErr,
	uploadLogo,
	addSchool,
	getSchool,
	updateSchool,
	setAlert,
	clearMsg,
	history
}) => {
	const initialModal = {
		objAdded: false,
		objUpdated: false,
		cancel: false,
		error: false
	};
	const [isUpdateForm, setForm] = useState(false);
	const [modal, setModal] = useState(initialModal);

	useEffect(() => {
		let subscribed = true;
		if (subscribed) getSchool();
		if (history.location.pathname.includes("school/edit")) setForm(true);
		else setForm(false);
		return () => (subscribed = false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (
			msgs.includes("SCHOOL_FOUND") &&
			!history.location.pathname.includes("school/edit")
		) {
			clearMsg("SCHOOL_FOUND");
			returnBackToHome();
		} else if (isUpdateForm && msgs.includes("SCHOOL_ERROR") && err === 3) {
			clearMsg("SCHOOL_ERROR");
			setModal({ ...modal, error: true });
		}
		// eslint-disable-next-line
	}, [msgs, isUpdateForm, err]);

	useEffect(() => {
		if (msgs.includes("SCHOOL_ADDED")) {
			clearMsg("SCHOOL_ADDED");
			setModal({ ...modal, objAdded: true });
		} else if (msgs.includes("SCHOOL_UPDATED")) {
			clearMsg("SCHOOL_UPDATED");
			setModal({ ...modal, objUpdated: true });
		} else if (msgs.includes("SCHOOL_ERROR")) {
			clearMsg("SCHOOL_ERROR");
			let msg = "Error al registrar la escuela.";

			if (err === 3) return;
			else if (err === 1) {
				msg +=
					" Error inesperado, intente nuevamente en unos instantes.";
			} else if (err === 5) {
				msg +=
					" Uno o más campos son invalidos, abstenerse de usar simbolos que no alfanuméricos.";
			} else if (err === 5.1) {
				msg +=
					" El campo obligatorio (nombre de la escuela) no fue proporcionado.";
			} else if (err === 11) {
				msg +=
					" Uno o más campos de uno o más estudiantes superaron el limite de caracteres.";
			}
			setAlert(msg, "danger", 6);
		} else if (msgs.includes("SCHOOL_LOGO_ERROR")) {
			clearMsg("SCHOOL_LOGO_ERROR");
			let msg = "Error al subir el logo.";

			if (logoErr === 1) {
				msg +=
					" Error inesperado, intente nuevamente en unos instantes.";
			} else if (logoErr === 5) {
				msg +=
					" Incorrecto tipo de imagen proporcionado. Tipos permitidos de imagen: jpg, jpeg, png";
			}
			setAlert(msg, "danger", 5);
		}
		// eslint-disable-next-line
	}, [msgs, obj]);

	const handleUpload = (formData) => uploadLogo(formData);
	const handleCancel = () => setModal({ ...modal, cancel: true });
	const handleSubmit = (obj) => {
		if (obj.name === "") {
			setAlert(
				"Error al registrar la escuela. El campo obligatorio (nombre de la escuela) no fue proporcionado.",
				"danger",
				6
			);
			return;
		}

		if (isUpdateForm) {
			if (!obj._id) {
				setAlert("Error: la escuela a actualizar no fue encontrada.");
				return;
			}
			updateSchool(obj);
		} else addSchool(obj);
	};

	const hideModal = () => setModal(initialModal);
	const returnBackToHome = () => history.push("/school");

	return (
		<Fragment>
			<Modal
				display={modal.objAdded}
				title="¡Escuela Agregada!"
				btnCancelTxt="Regresar"
				onCancel={returnBackToHome}
			>
				<p className="modal__main--text">
					La escuela fue correctamente registrada.
				</p>
			</Modal>
			<Modal
				display={modal.objUpdated}
				title="¡Escuela actualizada!"
				btnCancelTxt="Regresar"
				onCancel={returnBackToHome}
			>
				<p className="modal__main--text">
					La información de la escuela fue correctamente actualizada.
				</p>
			</Modal>
			<Modal
				display={modal.cancel}
				title="¿Cancelar edición?"
				btnCancelTxt="Seguir editando"
				btn1={{ className: "btn--red", text: "Cancelar edición" }}
				onCancel={hideModal}
				onAction1={returnBackToHome}
			>
				<p className="modal__main--text">
					Si cancela la edición los cambios no serán guardados.
				</p>
			</Modal>
			<Modal
				display={modal.error}
				title="¡Error!"
				btnCancelTxt="Regresar"
				onCancel={returnBackToHome}
			>
				<p className="modal__main--text">
					La escuela no se encontró, intente nuevamente en unos
					instantes.
				</p>
			</Modal>
			{loading ? (
				<Preloader loading={loading} bgColor="white-1" />
			) : (
				<SchoolForm
					isUpdateForm={isUpdateForm}
					obj={obj}
					logo={logo}
					handleUpload={handleUpload}
					handleCancel={handleCancel}
					handleSubmit={handleSubmit}
				/>
			)}
		</Fragment>
	);
};

SchoolFormHandler.propTypes = {
	obj: PropTypes.object,
	logo: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	err: PropTypes.number,
	uploadLogo: PropTypes.func.isRequired,
	addSchool: PropTypes.func.isRequired,
	getSchool: PropTypes.func.isRequired,
	updateSchool: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	obj: state.school.obj,
	logo: state.uploads.logo,
	loading: state.school.loading,
	err: state.school.error,
	logoErr: state.uploads.error
});

export default connect(
	mapStateToProps,
	{ uploadLogo, addSchool, getSchool, updateSchool, setAlert, clearMsg }
)(SchoolFormHandler);
