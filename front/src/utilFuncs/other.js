export const abrevText = (text, chars) => {
	if (typeof chars !== "number") {
		console.error(
			"Number of characters is required and has to be type of number. (abrevText)"
		);
		return null;
	}
	if (text === undefined) {
		console.error("Text must not be undefined. (abrevText)");
		return null;
	}
	if (text.toString().length > chars) {
		return `${text.substr(0, chars)}...`;
	}
	return text;
};

export const correctText = (text, keepLastSpace = false) => {
	if (typeof text !== "string") return text;
	let res = "";
	removeExtraSpace(`${text}#`, keepLastSpace)
		.split(" ")
		.forEach((obj, i) => {
			const word = obj[0].toUpperCase() + obj.substr(1).toLowerCase();
			if (i === 0) res = word;
			else res += ` ${word}`;
		});

	return res.slice(0, -1);
};

export const permutate = (arr) => {
	if (arr.length > 12) return null;
	let ret = [];

	for (let i = 0; i < arr.length; i++) {
		let rest = permutate(arr.slice(0, i).concat(arr.slice(i + 1)));

		if (!rest.length) ret.push([arr[i]]);
		else {
			for (let j = 0; j < rest.length; j = j + 1) {
				ret.push([arr[i]].concat(rest[j]));
			}
		}
	}
	return ret;
};

export const permutateArrToStr = (arr) => {
	const res = permutate(arr);

	let str = "";
	res.forEach((item) => {
		str += item.join(" ") + " ";
	});
	return str;
};

export const removeExtraSpace = (text, exceptLast) => {
	if (typeof text !== "string") return text;

	if (text.includes("  ")) {
		return removeExtraSpace(text.replace(/ {2}/g, " "), exceptLast);
	} else if (!exceptLast && text[text.length - 1] === " ") {
		return text.slice(0, -1);
	} else if (text[0] === " ") return text.substr(1);
	else return text;
};

export const validateStudents = (objects) => {
	return objects.reduce(
		(acc, obj) => {
			if (acc.all.length >= 75) {
				if (acc.msg === "") {
					acc.msg =
						"More than 75 students found. Please maintain student number less than 76 per file.";
				}
				return acc;
			}

			if (Object.keys(obj).length !== 4) return acc;

			const code = parseInt(obj[Object.keys(obj)[1]]);
			const nameLast = removeExtraSpace(
				obj[Object.keys(obj)[2]].toString()
			);
			const nameFirst = removeExtraSpace(
				obj[Object.keys(obj)[3]].toString()
			);

			if (
				isNaN(code) ||
				code < 0 ||
				code > 999999 ||
				nameLast.length === 0 ||
				nameFirst.length === 0
			) {
				return acc;
			}

			acc.all.push({
				group: "",
				code,
				nameLast,
				nameFirst
			});
			acc.codes.push(code);
			if (countInArray(code, acc.codes) > 1) acc.duplicates++;

			return acc;
		},
		{ all: [], codes: [], duplicates: 0, msg: "" }
	);
};

const countInArray = (item, arr) => {
	return arr.reduce((acc, next) => acc + (next === item), 0);
};
