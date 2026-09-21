import { buildStructuredTextWithLang } from './utils.js';

/**
 * @typedef StructuredCrumb
 * @property {string} path
 * @property {string} name
 * @property {string} [lang]
 */

/**
 * @typedef BuildStructuredBreadcrumbOptions
 * @property {string} lang - language code for the breadcrumb items
 * @property {string} origin - origin of the site, for absolute URLs
 * @property {StructuredCrumb[]} items - array of breadcrumb items
 */

/**
 * @param {BuildStructuredBreadcrumbOptions} options
 * @returns {import('schema-dts').BreadcrumbList}
 */
export function buildStructuredBreadcrumbs(options) {
	const { lang, origin, items } = options;
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@id': `${origin}${item.path}`,
				name: buildStructuredTextWithLang({ lang: item.lang ?? lang, value: item.name }),
			},
		})),
	};
}
