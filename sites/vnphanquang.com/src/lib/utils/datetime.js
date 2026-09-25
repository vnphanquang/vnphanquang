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

/**
 * @param {Date | number | string} date1
 * @param {Date | number | string} [date2]
 * @returns {string}
 */
export function formatTimeDiff(date1, date2 = new Date()) {
	if (!isValidDate(date1) || !isValidDate(date2)) return 'invalid date(s)';
	date1 = new Date(date1);
	date2 = new Date(date2);
	const diff = Math.abs(date1.getTime() - date2.getTime());

	const seconds = diff / 1000;
	if (seconds < 60) return `${Math.floor(seconds)}s`;

	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)}m`;

	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)}h`;

	const days = hours / 24;
	if (days < 30) return `${Math.floor(days)}d`;

	const months = days / 30;
	if (months < 12) return `${Math.floor(months)}mo`;

	const years = months / 12;
	return `${Math.floor(years)}y`;
}
