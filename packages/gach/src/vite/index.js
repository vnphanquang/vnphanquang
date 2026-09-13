import tailwindcss from '@tailwindcss/vite';
import { fontless } from 'fontless';

/**
 * @typedef GachOptions
 * @property {boolean} [markdown]
 */

/**
 * @param {GachOptions} [options]
 * @returns {import('vite').PluginOption}
 */
export function gach(options) {
	return [
		fontless(),
		tailwindcss(),
		...(options?.markdown
			? [
					import('@vnphanquang/markdown/svelte/vite').then(({ markdownInSvelte }) =>
						markdownInSvelte(),
					),
				]
			: []),
	];
}
