import { svelteMdTemplate } from 'svelte-md-template/vite';
import { unified } from 'unified';

import { createPreset } from '../unified/index.js';

/**
 * @returns {Promise<import('vite').Plugin[]>}
 */
export async function markdownInSvelte() {
	return [
		await svelteMdTemplate({
			importSource: '@vnphanquang/markdown/svelte',
			transformer: {
				type: 'unified',
				processor: unified().use(createPreset({ allowDangerousHtml: true })),
			},
		}),
		{
			name: 'vite-plugin-vnphanquang-markdown:config',
			config() {
				return {
					ssr: {
						noExternal: ['@vnphanquang/markdown'],
					},
				};
			},
		},
	];
}
