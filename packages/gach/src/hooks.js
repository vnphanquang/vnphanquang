import { PUBLIC_COOKIE_CONFIG } from './constants.js';

/**
 * @typedef ColorSchemeServerHookOptions
 * @property {{ name: string; domain?: string }} cookie - cookie configuration
 * @property {boolean} building - usually import('$app/env').building
 * @property {boolean | string} [transform] - whether to inject the placeholder in returned html with the color scheme value. Defaults to `%color-scheme%`.
 */

/**
 * @param {ColorSchemeServerHookOptions} options
 * @returns {import('@sveltejs/kit/hooks').Handle}
 */
export const createColorSchemeServerHook = function (options) {
	return async function ({ event, resolve }) {
		const { locals, cookies, url } = event;
		const { cookie, building, transform } = options;

		// setting locals
		locals.colorScheme =
			(!building &&
				/** @type {import('./constants').ColorScheme} */ (url.searchParams.get('color-scheme'))) ||
			/** @type {import('./constants').ColorScheme} */ (cookies.get(cookie.name)) ||
			'system';

		// setting cookies
		cookies.set(cookie.name, locals.colorScheme, {
			...PUBLIC_COOKIE_CONFIG,
			domain: cookie.domain,
		});

		if (transform === false) return resolve(event);
		const placeholder = typeof transform === 'string' ? transform : '%color-scheme%';
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(placeholder, locals.colorScheme),
		});
	};
};
