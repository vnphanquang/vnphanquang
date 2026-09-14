import path from 'node:path';

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
		{
			name: 'gach:allow-assets',
			config() {
				const dirname = import.meta.dirname;
				return {
					server: {
						fs: {
							allow: [
								path.resolve(
									dirname,
									'../styles/3-utilities/icons/animated/ia-3dots/animated-three-dots.svg',
								),
								path.resolve(
									dirname,
									'../styles/3-utilities/icons/animated/ia-spinner/animated-spinner.svg',
								),
							],
						},
					},
				};
			},
		},
	];
}
