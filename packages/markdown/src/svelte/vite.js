import { svelteMdTemplate } from 'svelte-md-template/vite';
import { unified } from 'unified';

import { createPreset } from '../unified.js';

/**
 * @returns {import('vite').PluginOption}
 */
export function markdownInSvelte() {
	return [
		svelteMdTemplate({
			importSource: '@vnphanquang/markdown/svelte',
			transformer: {
				type: 'unified',
				processor: unified().use(createPreset({ allowDangerousHtml: true })),
			},
		}),
	];
}
