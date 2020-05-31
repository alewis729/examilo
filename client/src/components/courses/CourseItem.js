import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getCourse, deleteCourse } from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import OptionsMenu from "../utils/OptionsMenu";
import Modal from "../utils/Modal";

const CourseItem = ({ course, getCourse, deleteCourse }) => {
	const { name, abrev, _id } = course;
	const options = [{ text: "Editar" }, { text: "Eliminar" }];
	const [modal, setModal] = useState({ objDelete: false });

	const setOption = (option) => {
		if (option.option) {
			switch (option.option) {
				case "Editar":
					getCourse(_id);
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
		deleteCourse(_id);
	};

	const hideModal = () => {
		setModal({ objDelete: false });
	};

	return (
		<Fragment>
			<Modal
				display={modal.objDelete}
				title="¿Eliminar el curso?"
				btn1={{ className: "btn--red", text: "Eliminar" }}
				onAction1={onDelete}
				onCancel={hideModal}
			>
				<p className="modal__main--text">
					¿Desea eliminar el curso de manera permanente?
				</p>
			</Modal>
			<div className="course">
				<div className="course--content">
					<p className="course--title">{name}</p>
					<p className="course--abrev">{abrev.toUpperCase()}</p>
					<OptionsMenu
						id={_id}
						options={options}
						setOption={setOption}
						blackDots={true}
					/>
				</div>
			</div>
		</Fragment>
	);
};

CourseItem.propTypes = {
	course: PropTypes.object.isRequired,
	getCourse: PropTypes.func.isRequired,
	deleteCourse: PropTypes.func.isRequired
};

export default connect(
	null,
	{ getCourse, deleteCourse }
)(CourseItem);
