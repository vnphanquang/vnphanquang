import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { fontless } from 'fontless';
import postcssColorScheme from 'postcss-color-scheme';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomSelectors from 'postcss-custom-selectors';

import { gitRef } from './plugins/vite-plugin-git-ref.js';

/** @import { Plugin } from 'vite' */

/**
 * @typedef GachOptions
 * @property {boolean} [markdown]
 */

/**
 * @param {GachOptions} [options]
 * @returns {Promise<Plugin[]>}
 */
export async function gach(options) {
	return [
		...fontless({
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
									// important to get keep a consistent font as loaded from Google Fonts
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
		...tailwindcss(),
		...(options?.markdown
			? await (await import('@vnphanquang/markdown/svelte/vite')).markdownInSvelte()
			: []),
		{
			name: 'vite-plugin-vnphanquang-gach:config',
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
					ssr: {
						noExternal: ['@vnphanquang/gach'],
					},
					server: {
						fs: {
							allow: [
								path.resolve(
									dirname,
									'../styles/4-utilities/icons/animated/ia-3dots/animated-three-dots.svg',
								),
								path.resolve(
									dirname,
									'../styles/4-utilities/icons/animated/ia-spinner/animated-spinner.svg',
								),
							],
						},
					},
				};
			},
		},
		gitRef(),
	];
}
