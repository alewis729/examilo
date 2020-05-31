const validate = (type, value, limit) => {
	let regex = "";
	let isValid = false;
	let newValue = value;

	switch (type) {
		// only for dev, for prod must spend more time on regex
		case "REAL":
			regex = /^-?\d*[.,]?\d*$/;

			if (
				parseInt(value[0]) === 0 &&
				(value[1] !== undefined &&
					(value[1] !== "." || value[1] !== ","))
			) {
				newValue = value[1];
			} else if (
				value[0] === "-" &&
				parseInt(value[1]) === 0 &&
				value[2] !== undefined &&
				value[2] !== "." &&
				value[2] !== ","
			) {
				newValue = `-${value[2]}`;
			}

			if (regex.test(newValue)) isValid = true;
			break;

		case "NATURAL":
			regex = /^\d*$/;

			if (parseInt(value[0]) === 0 && value[1] !== undefined) {
				newValue = value[1];
			}

			if (regex.test(newValue)) isValid = true;
			break;

		case "NATURAL_LIMIT":
			regex = /^\d*$/;

			if (!limit) break;
			if (regex.test(newValue) && newValue.toString().length <= limit) {
				isValid = true;
			}
			break;

		case "SHORT_DESC":
			regex = /^([0-9a-zñáéíóú_\-',.° ]){1,100}$/i;

			newValue = value;
			if (regex.test(newValue)) isValid = true;
			break;

		case "NAMES":
			regex = /^([a-zñáéíóú, ]){1,75}$/i;

			newValue = value;
			if (regex.test(newValue)) isValid = true;
			break;

		case "A-E":
			regex = /^[A-E]{1,4}$/i;

			if (value[1] !== undefined) newValue = value[1];
			else newValue = value[0];

			if (regex.test(newValue)) isValid = true;
			break;

		case "ABREV4":
			regex = /^[A-ZÑ0-9]{1,4}$/i;

			newValue = value;
			if (regex.test(newValue)) isValid = true;
			break;

		case "ABREV6":
			regex = /^[A-ZÑ0-9-]{1,6}$/i;

			newValue = value;
			if (regex.test(newValue)) isValid = true;
			break;

		default:
			isValid = false;
	}

	if (value === "") isValid = true;
	return { isValid, newValue };
};

export default validate;
