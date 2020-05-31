import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearMsg } from "../../redux/actions/messageActions";
import { deleteMany } from "../../redux/actions/examActions";
import { setAlert } from "../../redux/actions/alertActions";
import Modal from "../utils/Modal";

const ExamActionsHandler = ({
	setActiveModal,
	notifyOfHiddenModals,
	msgs,
	selected,
	clearMsg,
	deleteMany,
	setAlert
}) => {
	const closedModals = { confirmDeleteMany: false };

	const [modal, setModal] = useState(closedModals);

	useEffect(() => {
		if (setActiveModal === "") {
			setModal(closedModals);
		} else {
			setModal({ ...modal, [setActiveModal]: true });
		}
		// eslint-disable-next-line
	}, [setActiveModal]);

	useEffect(() => {
		if (msgs.includes("EXAM_DELETED")) {
			clearMsg("EXAM_DELETED");
			setAlert("Examen eliminado(a) correctamente.", "success", 2);
		} else if (msgs.includes("EXAMS_DELETED")) {
			clearMsg("EXAMS_DELETED");
			setAlert(
				"Los examenes seleccionados fueron eliminados correctamente.",
				"success",
				2
			);
		}
		// eslint-disable-next-line
	}, [msgs]);

	const onDeleteMany = () => {
		hideModal();

		const ids = selected.map((obj) => obj._id);
		deleteMany(ids);
	};

	const hideModal = () => {
		setModal(closedModals);
		notifyOfHiddenModals("");
	};

	return (
		<Fragment>
			<Modal
				display={modal.confirmDeleteMany}
				title="¿Eliminar examenes?"
				btn1={{ className: "btn--red", text: "Eliminar" }}
				onAction1={onDeleteMany}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿Desea eliminar los examenes seleccionados de manera
					permanente? Esta acción no es reversible.
				</p>
			</Modal>
		</Fragment>
	);
};

ExamActionsHandler.propTypes = {
	setActiveModal: PropTypes.string,
	notifyOfHiddenModals: PropTypes.func.isRequired,
	msgs: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	deleteMany: PropTypes.func.isRequired,
	clearMsg: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	selected: state.exam.selected
});

export default connect(
	mapStateToProps,
	{ clearMsg, deleteMany, setAlert }
)(ExamActionsHandler);
