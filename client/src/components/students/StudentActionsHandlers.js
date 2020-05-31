import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearMsg } from "../../redux/actions/messageActions";
import {
	updateMany,
	deleteMany,
	addManyStudents,
	clearFilter
} from "../../redux/actions/studentActions";
import { setAlert } from "../../redux/actions/alertActions";
import { uploadExcel } from "../../redux/actions/uploadActions";
import Modal from "../utils/Modal";
import SelectGroup from "../groups/SelectGroup";
import { correctText } from "../../utilFuncs/other";
import excelImg from "../../media/img/excelImg.png";

const StudentActionsHandler = ({
	setActiveModal,
	notifyOfHiddenModals,
	msgs,
	selected,
	importedStudents,
	errId,
	clearMsg,
	uploadExcel,
	addManyStudents,
	clearFilter,
	updateMany,
	deleteMany,
	setAlert
}) => {
	const closedModals = {
		onImport: false,
		setGroupForImported: false,
		uploadedDuplicates: false,
		uploadedLimit: false,
		onUpdate: false,
		confirmDeleteMany: false
	};

	const [modal, setModal] = useState(closedModals);
	const [activeGroup, setActiveGroup] = useState(null);
	const [newGroup, setNewGroup] = useState("");
	const input = useRef();

	useEffect(() => {
		clearFilter(); // needed to prevent checkbox not-appearing-bug
		if (setActiveModal === "") {
			setModal(closedModals);
		} else {
			setModal({ ...modal, [setActiveModal]: true });
		}
		// eslint-disable-next-line
	}, [setActiveModal]);

	useEffect(() => {
		if (msgs.includes("STUDENTS_ADDED")) {
			clearMsg("STUDENTS_ADDED");
			setAlert(
				"Los estudiantes importados fueron matriculados al grado seleccionado correctamente.",
				"success",
				5
			);
		} else if (msgs.includes("STUDENTS_ADD_MANY_ERROR")) {
			clearMsg("STUDENTS_ADD_MANY_ERROR");
			let msg = "Error al registrar multiples estudiantes.";
			const duration = errId >= 0 ? 7 : 3;

			if (errId === 3) {
				msg += " El grado a matricular no fue encontrado.";
			} else if (errId === 11) {
				msg +=
					" Uno o más campos de uno o más estudiantes superaron el limite de caracteres.";
			} else if (errId === 5) {
				msg +=
					" Uno o más campos de uno o más estudiantes son invalidos.";
			} else if (errId === 10) {
				msg +=
					" El código de uno o más estudiantes ya existe. El código de marcación debe ser unico para cada estudiante.";
			}

			setAlert(msg, "danger", duration);
		} else if (msgs.includes("STUDENTS_UPDATED")) {
			clearMsg("STUDENTS_UPDATED");
			setAlert(
				"Los estudiantes seleccionados fueron matriculados al grado seleccionado correctamente.",
				"success",
				3
			);
		} else if (msgs.includes("STUDENTS_UPDATE_MANY_ERROR")) {
			clearMsg("STUDENTS_UPDATE_MANY_ERROR");
			let msg = "Error al actualizar multiples estudiantes.";
			const duration = errId >= 0 ? 7 : 3;

			if (errId === 3) {
				msg += " El grado a matricular no fue encontrado.";
			} else if (errId === 5) {
				msg += " No se encontraron estudiantes para actualizar.";
			} else if (errId === 12) {
				msg +=
					" Se superó el limite de treinta (30) estudiantes para actualizar en una sola operación.";
			}

			setAlert(msg, "danger", duration);
		} else if (msgs.includes("STUDENT_DELETED")) {
			clearMsg("STUDENT_DELETED");
			setAlert("Estudiante eliminado(a) correctamente.", "success", 2);
		} else if (msgs.includes("STUDENTS_DELETED")) {
			clearMsg("STUDENTS_DELETED");
			setAlert(
				"Los estudiantes seleccionados fueron eliminados correctamente.",
				"success",
				2
			);
		} else if (msgs.includes("EXCEL_STUDENTS_UPLOAD_DUPLICATES")) {
			clearMsg("EXCEL_STUDENTS_UPLOAD_DUPLICATES");
			setModal({ ...modal, uploadedDuplicates: true });
		} else if (msgs.includes("EXCEL_STUDENTS_UPLOAD_LIMIT_REACHED")) {
			clearMsg("EXCEL_STUDENTS_UPLOAD_LIMIT_REACHED");
			setModal({ ...modal, uploadedLimit: true });
		} else if (msgs.includes("EXCEL_STUDENTS_UPLOAD_SUCCESS")) {
			clearMsg("EXCEL_STUDENTS_UPLOAD_SUCCESS");
			setModal({ ...modal, setGroupForImported: true });
		} else if (msgs.includes("EXCEL_STUDENTS_UPLOAD_ERROR")) {
			clearMsg("EXCEL_STUDENTS_UPLOAD_ERROR");
			setAlert(
				`Se produjo un error al subir el archivo excel. Verifique que todos los requisitos de las instrucciones se cumplieron: el archivo es de tipo excel (.xlsx) y el formato de la información de los estudiantes es como se muestra en la imagen.
                Si el problema persiste contacte a soporte.`,
				"danger",
				22
			);
		}
		// eslint-disable-next-line
	}, [msgs]);

	const setGroup = (item) => {
		setActiveGroup(item);
		if (item !== null && item.value) setNewGroup(item.value);
		else setNewGroup("");
	};

	const onDeleteMany = () => {
		hideModal();

		const ids = selected.map((obj) => obj._id);
		deleteMany(ids);
	};

	const onUpdate = () => {
		if (newGroup === "")
			setAlert(
				"Ocurrió un error inesperado al actualizar. Asegurese que seleccionó por lo menos un estudiante y un grado a matricular.",
				"danger"
			);
		else {
			hideModal();

			const ids = selected.map((obj) => obj._id);
			updateMany(newGroup, ids);

			setNewGroup("");
			setActiveGroup(null);
		}
	};

	const onAddMany = () => {
		if (newGroup === "")
			setAlert(
				"Ocurrió un error inesperado al matricular los estudiantes. No se encontró grado seleccionado.",
				"danger"
			);
		else {
			hideModal();
			const newStudents = importedStudents.all.map((obj) => ({
				group: newGroup,
				code: obj.code,
				nameLast: correctText(obj.nameLast),
				nameFirst: correctText(obj.nameFirst)
			}));

			addManyStudents(newStudents);

			setNewGroup("");
			setActiveGroup(null);
		}
	};

	const triggerInputOnChange = () => {
		hideModal();
		input.current.click();
	};

	const onFileUpload = (e) => {
		const file = e.target.files[0];
		if (file === null || file === undefined) return null;

		const formData = new FormData();
		formData.append("file", file);
		uploadExcel(formData);
		e.target.value = null; // allows to select the same file and upload again
	};

	const hideModal = () => {
		setModal(closedModals);
		notifyOfHiddenModals("");
	};

	return (
		<Fragment>
			<input
				type="file"
				style={{ display: "none" }}
				onChange={onFileUpload}
				ref={input}
			/>

			{/* ---------- IMPORTING STUDENTS FROM EXCEL ---------- */}
			<Modal
				display={modal.onImport}
				title="Importar desde excel"
				btnCancelTxt="De acuerdo"
				onCancel={triggerInputOnChange}
			>
				<p className="modal__main--text">
					Para importar estudiantes correctamente desde un archivo
					excel lea las instrucciones; de click a la imagen para
					visualizarla en pantalla completa.
				</p>
				<p className="modal__main--text">
					En cada fila debe estar la información de cada estudiante,
					siendo las primeras cuatro columnas el{" "}
					<span className="text--bold">número</span>, el{" "}
					<span className="text--bold">código de marcación</span>, los{" "}
					<span className="text--bold">apellidos</span> y los{" "}
					<span className="text--bold">nombres</span> respectivamente
					de cada estudiante como se muestra en la imagen.
				</p>
				<a
					href={excelImg}
					className="modal__main__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={excelImg}
						alt="imagen"
						className="modal__main__link--img"
					/>
					<span>Ver imagen</span>
				</a>
			</Modal>

			<Modal
				display={modal.setGroupForImported}
				title="Seleccionar grado"
				btn1={{ className: "btn--primary", text: "Matricular" }}
				onAction1={onAddMany}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					<span className="text--bold">
						{importedStudents.all.length} estudiantes encontrados
					</span>{" "}
					del archivo excel.
				</p>
				<p className="modal__main--text">
					Elegir a qué grado desea matricular a los estudiantes
					importados.
				</p>
				<SelectGroup returnGroup={setGroup} active={activeGroup} />
			</Modal>

			<Modal
				display={modal.uploadedDuplicates}
				title="Duplicados de estudiantes"
				onCancel={hideModal}
				btnCancelTxt="Cerrar"
			>
				<p className="modal__main--text">
					Se encontraron {importedStudents.duplicates} duplicados de
					códigos de estudiantes. El código de marcación debe ser
					único para cada estudiante.
				</p>
				<p className="modal__main--text">
					Corriga el archivo excel e intente nuevamente.
				</p>
			</Modal>

			<Modal
				display={modal.uploadedLimit}
				title="Limite de estudiantes"
				onCancel={hideModal}
				btnCancelTxt="Cerrar"
			>
				<p className="modal__main--text">
					Se encontró más estudiantes del limite. El limite de
					estudiantes a importar es 75 por cada archivo excel.
				</p>
				<p className="modal__main--text">
					Corriga el archivo excel e intente nuevamente.
				</p>
			</Modal>

			{/* ---------- UPDATING GROUP ---------- */}
			<Modal
				display={modal.onUpdate}
				title="Seleccionar grado"
				btn1={{ className: "btn--primary", text: "Matricular" }}
				onAction1={onUpdate}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿A qué grado desea matricular a los estudiantes
					seleccionados?
				</p>
				<SelectGroup returnGroup={setGroup} active={activeGroup} />
			</Modal>

			{/* ---------- DELETING MANY STUDENTS ---------- */}
			<Modal
				display={modal.confirmDeleteMany}
				title="¿Eliminar estudiantes?"
				btn1={{ className: "btn--red", text: "Eliminar" }}
				onAction1={onDeleteMany}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿Desea eliminar los estudiantes seleccionados de manera
					permanente? Esta acción no es reversible.
				</p>
			</Modal>
		</Fragment>
	);
};

StudentActionsHandler.propTypes = {
	setActiveModal: PropTypes.string,
	notifyOfHiddenModals: PropTypes.func.isRequired,
	msgs: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	importedStudents: PropTypes.object.isRequired,
	errId: PropTypes.number,
	clearMsg: PropTypes.func.isRequired,
	updateMany: PropTypes.func.isRequired,
	deleteMany: PropTypes.func.isRequired,
	uploadExcel: PropTypes.func.isRequired,
	addManyStudents: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	msgs: state.messages,
	selected: state.student.selected,
	importedStudents: state.uploads.students,
	errId: state.student.error
});

export default connect(
	mapStateToProps,
	{
		clearMsg,
		updateMany,
		deleteMany,
		uploadExcel,
		addManyStudents,
		clearFilter,
		setAlert
	}
)(StudentActionsHandler);
