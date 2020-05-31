import React from "react";
import PropTypes from "prop-types";

const Input = ({
	objKey,
	title,
	placeHolder,
	type,
	value,
	onChange,
	dataType,
	dataLimit,
	boxStyle,
	autoFocus
}) => {
	if (boxStyle) {
		return (
			<div className="form__group">
				<input
					type={type !== undefined ? type : "text"}
					value={value}
					placeholder={placeHolder}
					onChange={onChange}
					autoFocus={autoFocus}
					data-key={objKey}
					data-type={dataType}
					data-limit={dataLimit}
				/>
				<div className="form__group__label">
					<label htmlFor="name">{title}</label>
				</div>
			</div>
		);
	}

	return (
		<div className="u-input">
			<p className="u-input--title">{title}</p>
			<input
				type={type !== undefined ? type : "text"}
				value={value}
				placeholder={placeHolder}
				className="u-input--input"
				data-key={objKey}
				onChange={onChange}
				autoFocus={autoFocus}
				data-type={dataType}
				data-limit={dataLimit}
			/>
		</div>
	);
};

Input.propTypes = {
	objKey: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	type: PropTypes.string,
	dataType: PropTypes.string,
	dataLimit: PropTypes.string,
	boxStyle: PropTypes.bool,
	autoFocus: PropTypes.bool
};

export default Input;
