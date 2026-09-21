export const STATUSES = /** @type {const} */ (['info', 'success', 'warning', 'error']);
/** @typedef {(typeof STATUSES)[number]} Status */

export const COLOR_SCHEMES = /** @type {const} */ (['light', 'dark', 'system']);
/** @typedef {(typeof COLOR_SCHEMES)[number]} ColorScheme */

export const SCREENS = /** @type {const} */ (['mobile', 'tablet', 'desktop', 'widescreen']);
/** @typedef {(typeof SCREENS)[number]} Screen */

/** @type {Parameters<import('@sveltejs/kit').Cookies['set']>[2]} */
export const COMMON_COOKIE_CONFIG = {
	path: '/',
	secure: true,
	httpOnly: true,
	maxAge: 604800, // 7 days
};

/** @type {Parameters<import('@sveltejs/kit').Cookies['set']>[2]} */
export const PUBLIC_COOKIE_CONFIG = {
	...COMMON_COOKIE_CONFIG,
	httpOnly: false,
};

/**
 * @param {{ mode: string; subdomain?: string }} config
 * @returns {string | undefined}
 */
export function getCookieDomain(config) {
	const { mode, subdomain } = config;
	const domain = mode === 'production' ? 'vnphanquang.com' : undefined;
	if (domain) {
		return subdomain ? `${subdomain}.${domain}` : domain;
	}
	return undefined;
}

export const LANGUAGES = /** @type {const} */ (['en', 'vi']);
/** @typedef {(typeof LANGUAGES)[number]} Language */
