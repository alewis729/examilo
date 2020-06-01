/**
 * Converts hex to rgb.
 * @param {string} hex hex string; e.g. #0bb2f4 => 'rgba(11,178,244, 1)'
 * @param {number} alpha alpha value
 */
export const rgba = (hex, alpha = 1) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const obj = result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
	return obj ? `rgba(${obj.r},${obj.g},${obj.b}, ${alpha})` : null;
};
