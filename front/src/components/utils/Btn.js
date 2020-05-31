import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Btn = ({ classNames, text, type, onClick, disabled }) => {
	const [attributes, setAttributes] = useState({
		className: `btn ${classNames}`
	});

	useEffect(() => {
		if (disabled) {
			setAttributes({
				...attributes,
				disabled,
				className: `btn ${classNames} btn--disabled`
			});
		} else {
			setAttributes({
				...attributes,
				className: `btn ${classNames}`
			});
		}
		// eslint-disable-next-line
	}, [disabled]);

	useEffect(() => {
		if (type) setAttributes({ ...attributes, type });
		else setAttributes({ ...attributes, type: "button" });
		// eslint-disable-next-line
	}, [type]);

	useEffect(() => {
		if (onClick) setAttributes({ ...attributes, onClick });
		// eslint-disable-next-line
	}, [onClick]);

	return (
		<button {...attributes}>
			<span>{text}</span>
		</button>
	);
};

Btn.propTypes = {
	classNames: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
};

export default Btn;
