import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getGroup, deleteGroup } from "../../redux/actions/groupActions";
import PropTypes from "prop-types";
import { abrevText } from "../../utilFuncs/other";
import OptionsMenu from "../utils/OptionsMenu";
import Modal from "../utils/Modal";
import SVG from "../utils/SVG";

const GroupItem = ({ obj, getGroup, deleteGroup }) => {
	const { _id, name, abrev, color, students, exams, courses } = obj;
	const [modal, setModal] = useState({ objDelete: false });
	const options = [
		{ text: "Ver detalles", link: `/groups/${_id}` },
		{ text: "Editar" },
		{ text: "Eliminar" }
	];

	const setOption = (option) => {
		if (option.option) {
			switch (option.option) {
				case "Editar":
					getGroup(_id);
					break;
				case "Eliminar":
					setModal({ objDelete: true });
					break;
				default:
					return null;
			}
		}
	};

	const onDelete = () => {
		setModal({ objDelete: false });
		deleteGroup(_id);
	};

	const hideModal = () => setModal({ objDelete: false });

	return (
		<Fragment>
			<Modal
				display={modal.objDelete}
				title="¿Eliminar grado?"
				btn1={{ className: "btn--red", text: "Eliminar" }}
				onAction1={onDelete}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿Desea eliminar el grado de manera permanente? Esta acción
					no es reversible.
				</p>
			</Modal>
			<div className="group">
				<div className={`group--main group-colors--${color}`}>
					<div className="group__heading">
						<h2 className="group__heading--title">{abrev}</h2>
						<h4 className="group__heading--sub">
							{abrevText(name, 15)}
						</h4>
					</div>
					<OptionsMenu
						id={_id}
						options={options}
						setOption={setOption}
					/>
				</div>

				<ul className="group--summary">
					<li className="group__detail">
						<SVG icon="people" className="group__detail--icon" />
						<p className="group__detail--text">
							{`${students.length} `}
							{students.length === 1
								? "estudiante"
								: "estudiantes"}
						</p>
					</li>

					<li className="group__detail">
						<SVG icon="exam" className="group__detail--icon" />
						<p className="group__detail--text">
							{`${exams.length} `}
							{exams.length === 1 ? "examen" : "examenes"}
						</p>
					</li>

					<li className="group__detail">
						<SVG icon="book" className="group__detail--icon" />
						<p className="group__detail--text">
							{`${courses.length} `}
							{students.length === 1 ? "curso" : "cursos"}
						</p>
					</li>
				</ul>
			</div>
		</Fragment>
	);
};

GroupItem.propTypes = {
	obj: PropTypes.object,
	students: PropTypes.array,
	getGroup: PropTypes.func.isRequired,
	deleteGroup: PropTypes.func.isRequired
};

export default connect(
	null,
	{ getGroup, deleteGroup }
)(GroupItem);
