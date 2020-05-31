import React, { useState } from "react";
import PropTypes from "prop-types";
import SVG from "../utils/SVG";

const Filter = ({ searchFor, returnText }) => {
	const [text, setText] = useState("");
	const onChange = (e) => {
		e.preventDefault();
		const val = e.target.value;
		const regex = /^[a-zñáéíóú0-9 ]*$/i;

		if (regex.test(val) || val === "") {
			setText(val);
			returnText(val);
		}
	};

	return (
		<div className="filter">
			<div className="filter--content">
				<span className="filter__icon">
					<SVG icon="mag-glass" className="filter__icon--content" />
				</span>
				<input
					type="text"
					placeholder={`Buscar ${searchFor}...`}
					className="filter--input"
					value={text}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

Filter.propTypes = {
	searchFor: PropTypes.string.isRequired,
	returnText: PropTypes.func.isRequired
};

export default Filter;
