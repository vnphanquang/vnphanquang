/**
 * @param {Date | number | string} value
 * @returns {boolean}
 */
export function isValidDate(value) {
	return !isNaN(new Date(value).getTime());
}

/**
 * @param {Date | number | string} date
 * @returns {string}
 */
export function formatDateForBlog(date) {
	if (!isValidDate(date)) return date.toString();
	const d = new Date(date);
	return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
}
