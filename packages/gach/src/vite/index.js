import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { fontless } from 'fontless';
import postcssColorScheme from 'postcss-color-scheme';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomSelectors from 'postcss-custom-selectors';

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
		fontless({
			families: [
				// Configure a specific font
				{
					name: 'Inter',
					provider: 'google',
					weights: [400, 500, 600],
					styles: ['normal', 'italic'],
					display: 'swap',
					providerOptions: {
						google: {
							experimental: {
								variableAxis: {
									// important to get keep a consistent font as previously loaded from Google Fonts
									opsz: [['14', '32']],
								},
							},
						},
					},
					fallbacks: ['sans-serif'],
				},
			],
			experimental: {
				disableLocalFallbacks: true,
			},
		}),
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
					css: {
						transformer: 'postcss',
						postcss: {
							plugins: [
								postcssCustomMedia(),
								postcssCustomSelectors(),
								postcssColorScheme({ name: 'media' }),
							],
						},
					},
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
