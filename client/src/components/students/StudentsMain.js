import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	getAllStudents,
	filterItems,
	clearFilter,
	clearSelection
} from "../../redux/actions/studentActions";
import { setAlert } from "../../redux/actions/alertActions";
import PropTypes from "prop-types";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import Filter from "../layout/Filter";
import OptionsMenu from "../utils/OptionsMenu";
import StudentActionsHandlers from "./StudentActionsHandlers";
import { useSpring, animated as a } from "react-spring";

const StudentsMain = ({
	all,
	selected,
	filtered,
	getAllStudents,
	filterItems,
	clearFilter,
	clearSelection,
	setAlert
}) => {
	const [objects, setObjects] = useState([]);
	const [filterText, setFilterText] = useState("");
	const options = [
		{ text: "Importar estudiantes" },
		{ text: "Matricular seleccionados a otro grado" },
		{ text: "Eliminar seleccionados" }
	];
	const [activeModal, setActiveModal] = useState("");
	const spring = useSpring({
		opacity: 1,
		from: { opacity: 0 }
	});

	useEffect(() => {
		getAllStudents();
		clearFilter();
		clearSelection();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setObjects(all);
		// eslint-disable-next-line
	}, [all]);

	useEffect(() => {
		if (filterText !== "") setObjects(filtered);
		else if (filtered.length === 0) setObjects(all);
		else setObjects(filtered);
		// eslint-disable-next-line
	}, [filtered]);

	const setOption = (item) => {
		switch (item.option) {
			case "Importar estudiantes":
				setActiveModal("onImport");
				break;
			case "Matricular seleccionados a otro grado":
				if (selected.length > 0) setActiveModal("onUpdate");
				else
					setAlert(
						"No hay estudiantes seleccionados; intente nuevamente luego de seleccionar estudiantes.",
						"danger",
						5
					);
				break;
			case "Eliminar seleccionados":
				if (selected.length > 0) setActiveModal("confirmDeleteMany");
				else
					setAlert(
						"No hay estudiantes seleccionados; intente nuevamente luego de seleccionar estudiantes.",
						"danger",
						5
					);
				break;
			default:
				return null;
		}
	};

	const handleFilter = (text) => {
		setFilterText(text);
		if (text !== "") filterItems(text);
		else clearFilter();
	};

	const handleHiddenModals = () => setActiveModal("");

	return (
		<Fragment>
			<StudentActionsHandlers
				setActiveModal={activeModal}
				notifyOfHiddenModals={handleHiddenModals}
			/>
			<a.div style={spring} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						<h1>Estudiantes</h1>
					</div>
					<Filter searchFor="estudiantes" returnText={handleFilter} />
					<OptionsMenu
						id="students-page"
						options={options}
						setOption={setOption}
						special={true}
					/>
				</div>
				<div className="s-student">
					<StudentForm />
					<StudentList students={objects} />
				</div>
			</a.div>
		</Fragment>
	);
};

StudentsMain.propTypes = {
	all: PropTypes.array,
	selected: PropTypes.array.isRequired,
	filtered: PropTypes.array.isRequired,
	getAllStudents: PropTypes.func.isRequired,
	filterItems: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired,
	clearSelection: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	all: state.student.all,
	selected: state.student.selected,
	filtered: state.student.filtered
});

export default connect(
	mapStateToProps,
	{
		getAllStudents,
		filterItems,
		clearFilter,
		clearSelection,
		setAlert
	}
)(StudentsMain);
