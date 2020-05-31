import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	getAllGroups,
	filterItems,
	clearFilter
} from "../../redux/actions/groupActions";
import PropTypes from "prop-types";
import Filter from "../layout/Filter";
import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";
import Preloader from "../utils/Preloader";
import { useTransition, animated as a } from "react-spring";

const GroupsMain = ({
	loading,
	all,
	filtered,
	getAllGroups,
	filterItems,
	clearFilter
}) => {
	const [filterText, setFilterText] = useState("");
	const [objects, setObjects] = useState([]);
	const transitions = useTransition(loading, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	useEffect(() => {
		getAllGroups();
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

	const handleFilter = (text) => {
		setFilterText(text);
		if (text !== "") filterItems(text);
		else clearFilter();
	};

	return transitions.map(({ item, key, props }) =>
		item ? (
			<a.div style={props} key={key}>
				<Preloader loading={loading} />
			</a.div>
		) : (
			<a.div style={props} key={key} className="section">
				<div className="section__heading--container">
					<div className="section__heading">
						<h1>Grados</h1>
					</div>
					<Filter searchFor="grado" returnText={handleFilter} />
				</div>
				<div className="s-group">
					<GroupForm />
					{objects.map((obj) => (
						<GroupItem obj={obj} key={obj._id} />
					))}
				</div>
			</a.div>
		)
	);
};

GroupsMain.propTypes = {
	loading: PropTypes.bool.isRequired,
	all: PropTypes.array,
	filtered: PropTypes.array,
	getAllGroups: PropTypes.func.isRequired,
	filterItems: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	loading: state.group.loading,
	all: state.group.all,
	filtered: state.group.filtered
});

export default connect(
	mapStateToProps,
	{ getAllGroups, filterItems, clearFilter }
)(GroupsMain);
