import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
	getStudent,
	deleteStudent,
	selectItem,
	unselectItem
} from "../../redux/actions/studentActions";
import { setMsg } from "../../redux/actions/messageActions";
import PropTypes from "prop-types";
import { abrevText } from "../../utilFuncs/other";
import Modal from "../utils/Modal";
import OptionsMenu from "../utils/OptionsMenu";
import Checkbox from "../utils/Checkbox";

const StudentItem = ({
	obj,
	selected,
	getStudent,
	deleteStudent,
	selectItem,
	unselectItem,
	groupPage,
	setMsg,
	history
}) => {
	const { _id, code, nameLast, nameFirst, group } = obj;
	const [modal, setModal] = useState({ confirmDeleteOne: false });
	const options = [
		{ text: "Ver detalles", link: `/students/${_id}` },
		{ text: "Editar" },
		{ text: "Eliminar" }
	];
	const [isChecked, setIsChecked] = useState(false);
	const [chbState, setChbState] = useState(0);

	useEffect(() => {
		const isSelected = selected.filter((obj) => obj._id === _id).length;

		if (isChecked && isSelected === 0) setIsChecked(false);
		else if (!isChecked && isSelected > 0) setIsChecked(true);
		// eslint-disable-next-line
	}, [selected]);

	useEffect(() => {
		if (isChecked) setChbState(2);
		else if (!isChecked) setChbState(0);

		// eslint-disable-next-line
	}, [isChecked]);

	const setOption = (option) => {
		switch (option.option) {
			case "Editar":
				getStudent(_id);
				if (groupPage) {
					setMsg("EDIT_FROM_STUDENT_PAGE");
					setTimeout(() => history.push("/students"), 1); // 1ms is enough for the omenu to close (be updated while mounted)
				}
				break;
			case "Eliminar":
				setModal({ confirmDeleteOne: true });
				break;
			default:
				return null;
		}
	};

	const handleChange = () => {
		if (!groupPage) {
			if (isChecked) unselectItem(_id);
			else selectItem(obj);
		}

		setIsChecked(!isChecked);
	};

	const onDeleteOne = () => {
		hideModal();
		deleteStudent(_id);
	};

	const hideModal = () => {
		setModal({ confirmDeleteOne: false });
	};

	return (
		<Fragment>
			<Modal
				display={modal.confirmDeleteOne}
				title="¿Eliminar estudiante?"
				btn1={{ className: "btn--red", text: "Eliminar" }}
				onAction1={onDeleteOne}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿Desea eliminar el(la) estudiante de manera permanente? Esta
					acción no es reversible.
				</p>
			</Modal>
			<div className="list__item" onClick={handleChange}>
				<div className="list__item--main">
					{!groupPage && (
						<Fragment>
							<input
								type="checkbox"
								id={_id}
								className="list__item--checkbox"
								checked={isChecked}
								onChange={() => {}} // onchange added to prevent uncontrolled input warning, on div click handles the checkbox change
							/>
							<Checkbox
								state={chbState}
								className="list__item--checkbox--icon"
							/>
						</Fragment>
					)}

					<p className="list__item--code">{code}</p>
					<p className="list__item--name-last">
						{abrevText(nameLast, 16)}
					</p>
					<p className="list__item--name-first">
						{abrevText(nameFirst, 16)}
					</p>
					{!groupPage && (
						<p className="list__item--group">
							{group !== null ? group.abrev : "SIN GRUPO"}
						</p>
					)}
				</div>
				<OptionsMenu
					id={_id}
					options={options}
					setOption={setOption}
					blackDots={true}
				/>
			</div>
		</Fragment>
	);
};

StudentItem.propTypes = {
	obj: PropTypes.object,
	selected: PropTypes.array.isRequired,
	getStudent: PropTypes.func.isRequired,
	deleteStudent: PropTypes.func.isRequired,
	selectItem: PropTypes.func.isRequired,
	unselectItem: PropTypes.func.isRequired,
	groupPage: PropTypes.bool,
	history: PropTypes.object.isRequired,
	setMsg: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	selected: state.student.selected
});

export default connect(
	mapStateToProps,
	{ getStudent, deleteStudent, selectItem, unselectItem, setMsg }
)(withRouter(StudentItem));
