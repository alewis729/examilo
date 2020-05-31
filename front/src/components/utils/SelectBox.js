import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const SelectBox = ({
	options,
	returnActiveOption,
	active,
	placeholder = "Seleccionar..."
}) => {
	const [attributes, setAttributes] = useState({});

	useEffect(() => {
		if (active !== undefined && active !== null) {
			setAttributes({ ...attributes, value: active });
		} else {
			setAttributes({ ...attributes, value: null });
		}
		// eslint-disable-next-line
	}, [active]);

	const handleChange = (selectedOption) => {
		attributes.value = selectedOption;
		returnActiveOption(selectedOption);
	};

	return (
		<div className="select-box--container">
			<Select
				options={options}
				onChange={handleChange}
				placeholder={placeholder}
				{...attributes}
				noOptionsMessage={() => "¡No hay opciones!"}
				className="select-box"
				classNamePrefix="select-box"
			/>
		</div>
	);
};

SelectBox.propTypes = {
	options: PropTypes.array.isRequired,
	returnActiveOption: PropTypes.func.isRequired,
	active: PropTypes.object,
	placeholder: PropTypes.string
};

export default SelectBox;
