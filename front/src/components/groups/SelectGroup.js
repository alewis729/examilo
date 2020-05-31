import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllGroups } from "../../redux/actions/groupActions";
import PropTypes from "prop-types";
import SelectBox from "../utils/SelectBox";
import { abrevText } from "../../utilFuncs/other";

const SelectGroup = ({ groups, getAllGroups, returnGroup, active }) => {
	const [selectBoxOptions, setSelectBoxOptions] = useState([]);
	const [activeOption, setActiveOption] = useState(null);

	useEffect(() => {
		getAllGroups();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (active) setActiveOption(active);
		else setActiveOption(null);
		// eslint-disable-next-line
	}, [active]);

	useEffect(() => {
		if (groups.length > 0) {
			const groupsArr = groups.map((obj) => ({
				label: abrevText(obj.name, 24),
				value: obj._id
			}));
			setSelectBoxOptions(groupsArr);
		} else {
			setSelectBoxOptions([]);
		}
		// eslint-disable-next-line
	}, [groups]);

	const setSelectedOption = (item) => {
		setActiveOption(item);
		if (item) returnGroup(item);
		else returnGroup(null);
	};

	return (
		<SelectBox
			options={selectBoxOptions}
			returnActiveOption={setSelectedOption}
			active={activeOption}
			placeholder="Seleccionar grado..."
		/>
	);
};

SelectGroup.propTypes = {
	groups: PropTypes.array.isRequired,
	getAllGroups: PropTypes.func.isRequired,
	returnGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	groups: state.group.all
});

export default connect(
	mapStateToProps,
	{ getAllGroups }
)(SelectGroup);
